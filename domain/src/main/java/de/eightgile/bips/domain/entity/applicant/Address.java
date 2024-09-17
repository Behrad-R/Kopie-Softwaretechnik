package de.eightgile.bips.domain.entity.applicant;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.Embeddable;
import javax.validation.constraints.Size;

@Embeddable
@Getter
@Setter
public class Address {

    @Size(min= 1, max = 50, message = "Length must be between 1 and 50")
    private String country;
    @Size(min= 1, max = 100, message = "Length must be between 1 and 100")
    private String street;
    @Size(min= 1, max = 50, message = "Length must be between 1 and 50")
    private String houseNumber;
    @Size(min= 1, max = 50, message = "Length must be between 1 and 50")
    private String zipCode;

}
