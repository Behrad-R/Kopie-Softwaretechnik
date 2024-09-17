package de.eightgile.bips.domain.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import javax.validation.constraints.Size;
import java.time.LocalDateTime;

@Getter
@Setter
@Entity
public class StudyProgram {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private String id;

    @Size(min = 3, max = 50)
    private String name;
    private LocalDateTime deadline;
    private int regularStudyTime;
    private LocalDateTime startDate;
    @Min(0)
    @Max(300)
    private int credits;
    private int studyPlaces;
    private double numerusClausus;
    @Size(min = 1, max = 50)
    private String language;
    private String degree;

    private String commonInfoLink;
    private String studyManualLink;


}
