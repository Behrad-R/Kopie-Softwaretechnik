package de.eightgile.bips.domain.entity.applicant.document;

import com.fasterxml.jackson.annotation.JsonIgnore;
import de.eightgile.bips.domain.entity.applicant.Applicant;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Embeddable
@Getter
@Setter
@Inheritance(strategy = InheritanceType.JOINED)
//Definition of the documents
public class Document {

    @Id
    private String id;

    @JsonIgnore
    @ManyToOne
    private Applicant applicant;

    private DocumentType type;

    private String description;

    private String documentName;

    @JsonIgnore
    @Lob
    private byte[] documentFile;

}
