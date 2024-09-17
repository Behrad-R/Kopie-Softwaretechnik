package de.eightgile.bips.backend;

import de.eightgile.bips.domain.UserProfile;
import de.eightgile.bips.domain.entity.StudyProgram;
import de.eightgile.bips.domain.entity.applicant.Applicant;
import de.eightgile.bips.domain.entity.applicant.Application;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import javax.annotation.security.RolesAllowed;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import static de.eightgile.bips.security.UserProfileConfig.ROLE_APPLICANT;
import static de.eightgile.bips.security.UserProfileConfig.ROLE_ADMISSION_OFFICER;

@RestController
@RequestMapping("/api/application")
public class ApplicationController {
    // Initialize all important repositories
    @Autowired
    private ApplicationRepository applicationRepository;

    @Autowired
    private ApplicantRepository applicantRepository;

    @Autowired
    private StudyProgramRepository studyProgramRepository;
    // Initialize the current user
    @Autowired
    private UserProfile userProfile;
    // Api call for getting the specific application
    @RolesAllowed(ROLE_ADMISSION_OFFICER)
    @GetMapping("/{applicationID}")
    public Application getApplicationByID(@PathVariable String applicationID) throws ResponseStatusException {
        Optional<Application> currentApplication = applicationRepository.findById(applicationID);

        if (currentApplication.isPresent()) {
            return currentApplication.get();
        } else {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Application not found");
        }
    }
    //Api call for getting all applications
    @RolesAllowed(ROLE_ADMISSION_OFFICER)
    @GetMapping
    public Iterable<Application> getAllApplications() {
        return applicationRepository.findAll();
    }
    // Api call for getting all applications by study program
    @RolesAllowed(ROLE_ADMISSION_OFFICER)
    @GetMapping("/study-program/{studyProgramId}")
    public Iterable<Application> getAllApplicationsByStudyProgram(@PathVariable String studyProgramId) {
        List<Application> allByStudyProgram_id = applicationRepository.findAllByStudyProgram_Id(studyProgramId);
        return allByStudyProgram_id;
    }
    // Updates the intern State of the application (internState is set by the MZA/commission)
    @RolesAllowed(ROLE_ADMISSION_OFFICER)
    @PatchMapping("/{applicationID}/internState/{internState}")
    public void updateApplicationInternState(@PathVariable String applicationID, @PathVariable Application.State internState) {
        Optional<Application> currentApplication = applicationRepository.findById(applicationID);
        if (currentApplication.isPresent()) {
            currentApplication.get().setInternState(internState);
            applicationRepository.save(currentApplication.get());
        } else {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Application not found");
        }
    }
    //Api call for the applications of the current user
    @RolesAllowed(ROLE_APPLICANT)
    @GetMapping("/currentUser")
    public List<Application> getApplicationsByCurrentUser() {
        return applicationRepository.findAllByApplicant_Id(userProfile.getUserId());
    }
    // Api call for applying for a study program
    @RolesAllowed(ROLE_APPLICANT)
    @PutMapping("/apply/{studyProgramId}")
    public void saveApplication(@PathVariable String studyProgramId) {
        // Finding the current applicant
        Optional<Applicant> applicantOptional = applicantRepository.findById(userProfile.getUserId());
        if (applicantOptional.isPresent()) {
            // Finding the study Program by its id
            Optional<StudyProgram> studyProgramOptional = studyProgramRepository.findById(studyProgramId);
            if (studyProgramOptional.isPresent()) {
                //Finding Application by study program and applicant
                List<Application> appliedByApplicant = applicationRepository.findAllByStudyProgram_IdAndApplicant_Id(studyProgramId, userProfile.getUserId());
                // Checking if the applicant is already applied for the study program
                if (appliedByApplicant.isEmpty()) {
                    // Creating the application and saving it in the application repository
                    Application application = new Application();
                    application.setApplicant(applicantOptional.get());
                    application.setStudyProgram(studyProgramOptional.get());
                    application.setTimestamp(LocalDateTime.now());
                    application.setInternState(Application.State.PENDING);
                    application.setExternState(Application.State.PENDING);
                    application.setAcceptanceChoice(Application.State.AWAIT_RESPONSE);
                    applicationRepository.save(application);
                } else {
                    throw new ResponseStatusException(HttpStatus.CONFLICT, "Applicant already applied for this study program");
                }
            } else {
                throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Study program not found");
            }
        } else {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "No applicant found for user");
        }
    }
    // Api call for deleting the users own applications
    @RolesAllowed(ROLE_APPLICANT)
    @DeleteMapping("/currentUser/{applicationId}")
    public void deleteApplication(@PathVariable String applicationId) {
        Optional<Application> currentUserApplication = applicationRepository.findByIdAndApplicant_Id(applicationId, userProfile.getUserId());
        if (currentUserApplication.isPresent()){
            applicationRepository.delete(currentUserApplication.get());
        } else throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Application not found");
    }
    // TODO: Implementing the frontend part of this api call
    @RolesAllowed(ROLE_APPLICANT)
    @PatchMapping("/currentUser/{applicationIndex}/applicationChoice")
    public void updateApplicationAcceptanceChoice(@RequestBody Application.State acceptanceChoice, @PathVariable int applicationIndex) {
        List<Application> currentUserApplication = applicationRepository.findAllByApplicant_Id(userProfile.getUserId());
        if (!currentUserApplication.isEmpty()) {
            currentUserApplication.get(applicationIndex).setAcceptanceChoice(acceptanceChoice);
            applicationRepository.save(currentUserApplication.get(applicationIndex));
        } else {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Application not found");
        }

    }
}
