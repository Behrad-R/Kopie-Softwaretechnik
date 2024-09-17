package de.eightgile.bips.backend;

import de.eightgile.bips.domain.entity.applicant.Application;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
// Application Database
@Repository
public interface ApplicationRepository extends CrudRepository<Application, String> {

    List<Application> findAllByApplicant_Id(String applicantId);
    Optional<Application> findByIdAndApplicant_Id(String applicationId, String applicantId);
    List<Application> findAllByInternStateAndStudyProgram_Id(Application.State internState, String studyProgramId);
    List<Application> findAllByStudyProgram_Id(String studyProgramId);
    List<Application> findAllByStudyProgram_IdAndApplicant_Id(String studyProgramId, String applicantId);
    int countAllByStudyProgram_Id(String studyProgramID);
}
