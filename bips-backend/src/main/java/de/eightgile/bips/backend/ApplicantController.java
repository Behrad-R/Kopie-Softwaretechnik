package de.eightgile.bips.backend;


import de.eightgile.bips.domain.entity.applicant.Applicant;
import de.eightgile.bips.domain.entity.applicant.document.Document;
import de.eightgile.bips.domain.entity.applicant.document.DocumentType;
import de.eightgile.bips.security.UserProfileConfig;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import javax.annotation.security.RolesAllowed;
import java.io.IOException;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/applicant")
@Slf4j
// Applicant controller
public class ApplicantController {

    // Initialize repository
    @Autowired
    private ApplicantRepository repository;

    // Api mapping for getting a single Applicant by his ID
    @RolesAllowed(UserProfileConfig.ROLE_ADMISSION_OFFICER)
    @GetMapping("/{applicantID}")
    public Applicant getApplicantByID(@PathVariable String applicantID) throws ResponseStatusException {
        // Selects Applicant if he exists
        Optional<Applicant> currentApplicant = repository.findById(applicantID);
        if (currentApplicant.isPresent()) {
            return currentApplicant.get();
        } else {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Application not found");
        }
    }

    // Api mapping for getting all applicants out of the repository
    @RolesAllowed(UserProfileConfig.ROLE_ADMISSION_OFFICER)
    @GetMapping
    public Iterable<Applicant> getAllApplicants() {
        return repository.findAll();
    }


    @RolesAllowed(UserProfileConfig.ROLE_ADMISSION_OFFICER)
    @GetMapping(path = "/{applicantID}/documents/{documentId}", produces = "application/pdf")
    public ResponseEntity<byte[]> getFile(@PathVariable String applicantID, @PathVariable String documentId) {
        Optional<Applicant> currentApplicant = repository.findById(applicantID);
        if (currentApplicant.isPresent()) {
            //Gets the specific document from the applicant
            List<Document> documentById = currentApplicant.get().getDocuments().stream().filter(document -> document.getId().equals(documentId)).collect(Collectors.toList());
            if (!documentById.isEmpty()) {
                // Parses the document byte array into the body variable
                byte[] body = documentById.get(0).getDocumentFile();
                // Parses the document name into the fileName variable
                String fileName = documentById.get(0).getDocumentName();
                //returns the response with the body and fileName variable
                return ResponseEntity
                        .ok()
                        .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + fileName + ".pdf\"")
                        .body(body);
            } else {
                throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Document not found");
            }
        } else {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Applicant not found");
        }
    }
    //Post Mapping for uploading files
    @PostMapping("/{applicantID}/documents")
    public void saveDocuments(@PathVariable String applicantID, @RequestParam("file") MultipartFile file,
                              @RequestParam("documentType") DocumentType documentType,
                              @RequestParam("description") String description) throws IOException {
        log.debug(file.getContentType());
        // Checks if the filetype is pdf
        if (Objects.equals(file.getContentType(), "application/pdf")) {
            Optional<Applicant> currentApplicant = repository.findById(applicantID);
            if (currentApplicant.isPresent()) {
                // Setting the documents attributes
                Document document = new Document();
                document.setDocumentName(file.getOriginalFilename());
                document.setDocumentFile(file.getBytes());
                document.setDescription(description);
                document.setType(documentType);
                // Adds document to the documents attribute of the specific applicant
                currentApplicant.get().getDocuments().add(document);
                repository.save(currentApplicant.get());
            } else {
                throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Applicant not found");
            }
        } else {
            throw new ResponseStatusException(HttpStatus.UNSUPPORTED_MEDIA_TYPE, "Only PDFs");
        }
    }
}
