package de.eightgile.bips.domain.entity.applicant;

import de.eightgile.bips.domain.entity.StudyProgram;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import java.time.LocalDateTime;

@Getter
@Setter
@Entity
public class Application {

    @Id
    @GeneratedValue(generator = "UUID")
    @GenericGenerator(
            name = "UUID",
            strategy = "org.hibernate.id.UUIDGenerator"
    )
    private String id;

    @ManyToOne
    private Applicant applicant;

    @ManyToOne
    private StudyProgram studyProgram;

    private LocalDateTime timestamp;

    /**
     * Only used for admission officer
     */
    private State internState;
    /**
     * Displayed to the applicant. Changed only when the application process has ended.
     */
    private State externState;

    /**
     * Only for the applicant, if the application process has ended and the applicant
     * got accepted.
     */
    private State acceptanceChoice;

    public enum State {
        PENDING,
        ACCEPTED,
        MUTUAL_ACCEPTED,
        DECLINED_BY_APPLICANT,
        DECLINED_BY_INSTITUTE,
        AWAIT_RESPONSE,
        MARKED
    }


}
