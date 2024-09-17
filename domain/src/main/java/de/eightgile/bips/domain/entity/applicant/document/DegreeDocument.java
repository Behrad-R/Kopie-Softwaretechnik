package de.eightgile.bips.domain.entity.applicant.document;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.Embeddable;
import javax.persistence.Entity;

@Getter
@Setter
@Embeddable
@Entity
// Defining the attributes of the degree documents
public class DegreeDocument extends Document {
    private DegreeType degreeType;
    private double gradeAverage;
    private String nameOfInstitute;

}
