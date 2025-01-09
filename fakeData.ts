import { Activity, MarksType, UserType } from "@/types";

export const fakeUser: UserType = {
    firstname: "Fake",
    title: "Fake user",
    userinfo: undefined,
    admin: false,
    close: false,
    course_code: "",
    credits: 3,
    ctime: "",
    editable: true,
    events: undefined,
    gpa: [
        {
            gpa: "4.0",
            cycle: "bachelor",
        }
    ],
    groups: undefined,
    id_history: "",
    id_promo: "",
    internal_email: "fake@epitech.eu",
    invited: false,
    lastname: "User",
    location: "",
    login: "fake",
    mtime: "",
    picture: "https://placehold.co/400/png",
    promo: "",
    restrictprofiles: false,
    rights: {},
    scholaryear: new Date().getFullYear().toString(),
    school_code: "",
    school_id: 0,
    school_title: "",
    semester: 0,
    semester_code: "",
    studentyear: 1
}

export const fakeActivities: Activity[] = [
    {
        "title_module": "G0 - PC Development",
        "codemodule": "G-PCP-000",
        "scolaryear": "2024",
        "codeinstance": "BAR-0-1",
        "code_location": "BAR",
        "begin_event": null,
        "end_event": null,
        "seats": null,
        "num_event": null,
        "type_acti": "Project",
        "type_acti_code": "proj",
        "codeacti": "acti-654980",
        "acti_title": "Personal Development",
        "num": "1",
        "begin_acti": "2024-09-04 00:00:00",
        "end_acti": "2025-06-29 00:00:00",
        "registered": 1,
        "info_creneau": null,
        "project": "Projet : Personal Development",
        "rights": [
            "student"
        ]
    },
    {
        "title_module": "G1 - C Graphical Programming",
        "codemodule": "B-MUL-100",
        "scolaryear": "2024",
        "codeinstance": "BAR-1-1",
        "code_location": "BAR",
        "begin_event": null,
        "end_event": null,
        "seats": null,
        "num_event": null,
        "type_acti": "Project",
        "type_acti_code": "proj",
        "codeacti": "acti-00000",
        "acti_title": "MyRadar",
        "num": "2",
        "begin_acti": "2024-11-30 08:42:00",
        "end_acti": "2025-01-10 19:42:00",
        "registered": 1,
        "info_creneau": null,
        "project": "Projet : [B1][MUL]  MyRadar",
        "rights": [
            "student"
        ]
    },
    {
        "title_module": "G1 - Elementary Programming in C",
        "codemodule": "B-CPE-110",
        "scolaryear": "2024",
        "codeinstance": "BAR-1-1",
        "code_location": "BAR",
        "begin_event": "2025-01-07 09:30:00",
        "end_event": "2025-01-07 10:00:00",
        "seats": null,
        "num_event": 1,
        "type_acti": "Kick-off",
        "type_acti_code": "class",
        "codeacti": "acti-00000",
        "acti_title": "Kick-off - Secured",
        "num": "4",
        "begin_acti": "2025-01-06 00:00:00",
        "end_acti": "2025-01-12 00:00:00",
        "registered": 1,
        "info_creneau": null,
        "project": "",
        "rights": [
            "student"
        ]
    }
]

export const fakeMarks: MarksType = {
    modules: [
        {
            "barrage": 224,
            "codeinstance": "BAR-0-1",
            "codemodule": "G-ENG-001",
            "credits": 0,
            "cycle": "bachelor",
            "date_ins": "2024-09-27 09:22:02",
            "grade": "-",
            "id_user_history": "7878",
            notes: [],
            "scolaryear": 2024,
            "title": "G0 - English - TEPitech",
        },
        {
            "barrage": 0,
            "codeinstance": "BAR-1-1",
            "codemodule": "B-CPE-100",
            "credits": 4,
            "cycle": "bachelor",
            "date_ins": "2024-10-23 12:23:51",
            "grade": "A",
            "id_user_history": "65778",
            notes: [],
            "scolaryear": 2024,
            "title": "G1 - Unix & C Lab Seminar (Part I)"
        }
    ],
    notes: [
        {
            "codeacti": "acti-00000",
            "codeinstance": "BAR-1-1",
            "codemodule": "B-CPE-100",
            "comment": "This is a fake comment",
            "correcteur": "teacher@epitech.eu",
            "date": "2024-10-05 10:14:46",
            "final_note": 8,
            "scolaryear": 2024,
            "title": "C Pool Day 03",
            "titlemodule": "G1 - Unix & C Lab Seminar (Part I)"
        },
        {
            "codeacti": "acti-00000",
            "codeinstance": "BAR-0-1",
            "codemodule": "G-ENG-001",
            "comment": "Fake comment",
            "correcteur": "teacher@epitech.eu",
            "date": "2024-10-05 10:14:46",
            "final_note": 800,
            "scolaryear": 2024,
            "title": "G0 - English - TEPitech",
            "titlemodule": "G0 - English - TEPitech"
        }
    ]
}