package de.eightgile.bips.backend;

import de.eightgile.bips.domain.entity.StudyProgram;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

// Study program database
@Repository
public interface StudyProgramRepository extends CrudRepository<StudyProgram, String> {

}
