package de.eightgile.bips.domain.entity.applicant;

import de.eightgile.bips.domain.entity.applicant.document.DegreeDocument;
import de.eightgile.bips.domain.entity.applicant.document.Document;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import javax.validation.constraints.Pattern;
import java.util.List;

@Getter
@Setter
@Entity
public class Applicant {

    @Id
    private String id;

    private boolean euStudent;
    private Gender gender;

    private Address address;

    @Pattern(regexp = "[0-9]{2,20}")
    private String phoneNumber;

    @Min(0)
    @Max(16)
    private int waitingTerms;

    @OneToMany(mappedBy = "applicant")
    private List<DegreeDocument> degrees;

    @OneToMany(mappedBy = "applicant")
    private List<Document> documents;


    public enum Gender {
        MALE,
        FEMALE,
        OTHER
    }

}
