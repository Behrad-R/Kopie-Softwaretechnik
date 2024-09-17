package de.eightgile.bips.backend;

import de.eightgile.bips.domain.entity.StudyProgram;
import de.eightgile.bips.domain.entity.applicant.Application;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import javax.annotation.security.RolesAllowed;
import java.util.List;
import java.util.Optional;

import static de.eightgile.bips.security.UserProfileConfig.ROLE_ADMISSION_OFFICER;

@RestController
@RequestMapping("/api/study-program")
public class StudyProgramController {

    @Autowired
    StudyProgramRepository studyProgramRepository;

    @Autowired
    ApplicationRepository applicationRepository;
    // Counts all applications for a specific study program
    @GetMapping("/{studyProgramID}/count-applications")
    public int countApplicationByStudyProgram(@PathVariable String studyProgramID) {
        return applicationRepository.countAllByStudyProgram_Id(studyProgramID);
    }
    // Api call for getting a specific study program
    @GetMapping("/{studyProgramID}")
    public StudyProgram getById(@PathVariable String studyProgramID) {
        Optional<StudyProgram> byId = studyProgramRepository.findById(studyProgramID);
        if (byId.isPresent()) {
            return byId.get();
        } else {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND);
        }
    }

    /**
     * Sets the external state to the internal state of all applications with state ACCEPTED and DECLINED_BY_INSTITUTE
     */
    @RolesAllowed(ROLE_ADMISSION_OFFICER)
    @PatchMapping("/{studyProgramId}/finish-process")
    public void finishApplyProcess(@PathVariable String studyProgramId) {
        List<Application> applications = applicationRepository.findAllByInternStateAndStudyProgram_Id(Application.State.ACCEPTED, studyProgramId);
        applications.addAll(applicationRepository.findAllByInternStateAndStudyProgram_Id(Application.State.DECLINED_BY_INSTITUTE, studyProgramId));

        //TODO: implement plausibility check to verify that not more applicants will be accepted than there are study places

        applications.forEach(application -> application.setExternState(application.getInternState()));
        applicationRepository.saveAll(applications);
    }

    @GetMapping
    public Iterable<StudyProgram> getAllStudyPrograms() {
        return studyProgramRepository.findAll();
    }

    @PostMapping
    public void newStudyProgram(@RequestBody StudyProgram studyProgram) {
        studyProgramRepository.save(studyProgram);
    }

}
