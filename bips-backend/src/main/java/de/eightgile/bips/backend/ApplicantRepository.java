package de.eightgile.bips.backend;

import de.eightgile.bips.domain.entity.applicant.Applicant;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
//Applicant Database
public interface ApplicantRepository extends CrudRepository<Applicant, String> {

}
