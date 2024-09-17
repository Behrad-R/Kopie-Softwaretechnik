import {DegreeType, DocumentType, State} from "./generated"

/**
 * Used for all mappings of enumerations
 */
export const i18n = {

    document: new Map([
            [DocumentType.CURRICULUM_VITAE, "Lebenslauf"],
            [DocumentType.DEGREE, "Abschluss"],
            [DocumentType.HEALTH_INSURANCE_CERTIFICATE, "Krankenversicherungsbescheinigung"],
            [DocumentType.INTERNSHIP, "Praktikum"],
            [DocumentType.VOLUNTARY_SOCIAL_YEAR, "Freiwilliges Soziales Jahr"],
            [DocumentType.RECOMMENDATION, "Empfehlungen"]
        ]
    ),

    degree: new Map([
       [DegreeType.SCHOOL, "Schulausbildung"],
       [DegreeType.PROFESSIONAL_TRAINING, "Berufsausbildung"],
       [DegreeType.UNIVERSITY, "Studium"]
    ]),

    state: new Map([
        [State.ACCEPTED, "Akzeptiert"],
        [State.PENDING, "Ausstehend"],
        [State.DECLINED_BY_INSTITUTE, "Abgelehnt"]
    ])


}