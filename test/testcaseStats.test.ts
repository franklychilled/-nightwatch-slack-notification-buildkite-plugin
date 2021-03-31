import {addStatsToCommit, allStats, combineStats, stats} from "../src/testcaseStats";
import {describe, expect, it} from "@jest/globals";
import {NightWatchResult} from "../src/interfaces/nightWatchResult.interface";

describe("Convert test cases statistics", () => {
    it("should calculate passed test with testcase stats", async (done) => {
        const testsuites = {
            "testsuites": {
                "$": {
                    "errors": "0",
                    "failures": "0",
                    "tests": "1"
                },
                "testsuite": [
                    {
                        "$": {
                            "errors": "0",
                            "failures": "0",
                            "hostname": "",
                            "id": "",
                            "name": "accessibility.login",
                            "package": "accessibility",
                            "skipped": "3",
                            "tests": "1",
                            "time": "4.557",
                            "timestamp": ""
                        },
                        "testcase": [
                            {
                                "$": {
                                    "assertions": "7",
                                    "classname": "accessibility.login",
                                    "name": "accessibility/login - Launch Login page",
                                    "time": "4.557"
                                }
                            }
                        ]
                    }
                ]
            }
        };

        const actual = await stats(testsuites);

        expect(actual).toStrictEqual({passed: 1, ignored: 0, failed: 0});

        done();
    });

    it("should calculate no test with wrong testsuite", async (done) => {
        const testsuites = {
                "testsuites": {
                    "$": {
                        "errors": "0",
                        "failures": "0",
                        "tests": "0"
                    },
                    "testsuite": "no an array"
                }
            };

        const actual = await stats(testsuites);

        expect(actual).toStrictEqual({passed: 0, ignored: 0, failed: 0});

        done();
    });

    it("should calculate no test with no testsuites", async (done) => {
        const testsuites = {
            "testsuites": {

            }
        };

        const actual = await stats(testsuites);

        expect(actual).toStrictEqual({passed: 0, ignored: 0, failed: 0});

        done();
    });

    it("should fail without testsuites", () => {
        const testsuites = {
        };

        expect(() => stats(testsuites))
            .toThrow();
    });

    it("should calculate failed test with testcase stats", async (done) => {
        const testsuites = {
            "testsuites": {
                "$": {
                    "errors": "0",
                    "failures": "1",
                    "tests": "1"
                },
                "testsuite": [
                    {
                        "$": {
                            "errors": "0",
                            "failures": "1",
                            "hostname": "",
                            "id": "",
                            "name": "contingency.contingencyTextUser",
                            "package": "contingency",
                            "skipped": "0",
                            "tests": "1",
                            "time": "179.4",
                            "timestamp": ""
                        },
                        "system-err": [
                            "\n            [0;31m Error: Case file not found: ../fixtures/test/client/factFindSingle.json[0m\n            [0;90m at Function.loadCaseFromDisk (/app/pages/caseLoading.js:101:19)\n            at Function.loadCase (/app/pages/caseLoading.js:73:29)\n            at LoginPage.loadCase (/app/pages/basePage.js:254:63)\n            at factFindNavigation (/app/tests/integration/factfindSLMarketingButton.js:29:11)\n            at Object.integration/factfindSLMarketingButton - Single Client logs on to Portal and initiates Fact find\n            journey from Marketing Panel button. (/app/tests/integration/factfindSLMarketingButton.js:13:9)[0m\n        "
                        ],
                        "testcase": [
                            {
                                "$": {
                                    "assertions": "196",
                                    "classname": "contingency.contingencyTextUser",
                                    "name": "contingency/contingencyTextUser - User navigates to Contingency screens for text validation",
                                    "time": "179.4"
                                },
                                "failure": [
                                    {
                                        "$": {
                                            "message": "Timed out while waiting for element <a[href*='/accountOpening']> to be present for 120000 milliseconds. - expected [0;32m\"visible\"[0m but got: [0;31m\"not found\"[0m [0;90m(120004ms)[0m"
                                        },
                                        "_": "\n                at SearchInvestments.selectOpenAccount\n                (/app/pages/searchInvestments/searchInvestments.js:502:14)\n                at Object.contingency/contingencyTextUser - User navigates to Contingency screens for text\n                validation (/app/tests/contingency/contingencyTextUser.js:234:14)\n                at runMicrotasks (<anonymous>)\n            "
                                    },
                                    {
                                        "$": {
                                            "message": "    at SearchInvestments.selectOpenAccount (/app/pages/searchInvestments/searchInvestments.js:502:14)"
                                        },
                                        "_": "\n                at Object.contingency/contingencyTextUser - User navigates to Contingency screens for text\n                validation (/app/tests/contingency/contingencyTextUser.js:234:14)\n                at runMicrotasks (<anonymous>)\n            "
                                    }
                                ],
                                "system-out": [
                                    "\n                [[ATTACHMENT|/reports/contingency/contingencyTextUser/contingency/contingencyTextUser---User-navigates-to-Contingency-screens-for-text-validation_FAILED_Jun-11-2020-181545-GMT+0000-(Coordinated-Universal.png]]\n            "
                                ]
                            }
                        ]
                    }
                ]
            }
        };

        const actual = await stats(testsuites);

        expect(actual).toStrictEqual({passed: 0, ignored: 0, failed: 1});

        done();
    });

    it("should calculate skipped test with testcase stats", async (done) => {
        const testsuites = {
            "testsuites": {
                "$": {
                    "errors": "0",
                    "failures": "0",
                    "tests": "0"
                },
                "testsuite": [
                    {
                        "$": {
                            "errors": "0",
                            "failures": "0",
                            "hostname": "",
                            "id": "",
                            "name": "register.register",
                            "package": "register",
                            "skipped": "9",
                            "tests": "0",
                            "time": "0",
                            "timestamp": ""
                        },
                        "system-err": [
                            "\n      [0;31m  Error: Case file not found: ../fixtures/test/client/factFindSingle.json[0m\n[0;90m       at Function.loadCaseFromDisk (/app/pages/caseLoading.js:101:19)\n       at Function.loadCase (/app/pages/caseLoading.js:73:29)\n       at LoginPage.loadCase (/app/pages/basePage.js:254:63)\n       at factFindNavigation (/app/tests/integration/factfindSLMarketingButton.js:29:11)\n       at Object.integration/factfindSLMarketingButton - Single Client logs on to Portal and initiates Fact find journey from Marketing Panel button. (/app/tests/integration/factfindSLMarketingButton.js:13:9)[0m\n    "
                        ],
                        "testcase": [
                            {
                                "$": {
                                    "classname": "register.register",
                                    "name": "register/register - Creating a new Self Directed client with an ISA"
                                },
                                "skipped": [
                                    ""
                                ]
                            },
                            {
                                "$": {
                                    "classname": "register.register",
                                    "name": "Creating a new Self Directed Client who owns a GIA with a manually entered address"
                                },
                                "skipped": [
                                    ""
                                ]
                            },
                            {
                                "$": {
                                    "classname": "register.register",
                                    "name": "Creating a new Self Directed Client Who owns an ISA and has a Second Correspondance Address"
                                },
                                "skipped": [
                                    ""
                                ]
                            },
                            {
                                "$": {
                                    "classname": "register.register",
                                    "name": "Creating a new Self Directed Client who has a Second Nationality"
                                },
                                "skipped": [
                                    ""
                                ]
                            },
                            {
                                "$": {
                                    "classname": "register.register",
                                    "name": "Creating a new Self Directed Client who has a Second Tax Reference and Nationality"
                                },
                                "skipped": [
                                    ""
                                ]
                            },
                            {
                                "$": {
                                    "classname": "register.register",
                                    "name": "Creating a new Self Directed client who has a SIPP, Manually entered correspondance address and a Joint Building Society Account"
                                },
                                "skipped": [
                                    ""
                                ]
                            },
                            {
                                "$": {
                                    "classname": "register.register",
                                    "name": "Create a new  Current Partner"
                                },
                                "skipped": [
                                    ""
                                ]
                            },
                            {
                                "$": {
                                    "classname": "register.register",
                                    "name": "Create a new  Dependant linked to Current Partner"
                                },
                                "skipped": [
                                    ""
                                ]
                            },
                            {
                                "$": {
                                    "classname": "register.register",
                                    "name": "Create a new  Spouse Linked to Currewnt "
                                },
                                "skipped": [
                                    ""
                                ]
                            }
                        ]
                    }
                ]
            }
        };

        const actual = await stats(testsuites);

        expect(actual).toStrictEqual({passed: 0, ignored: 9, failed: 0});

        done();
    });

    it("should parse all JSON files with testcase stats", async (done) => {
        const testsuites = [
            {
                "testsuites": {
                    "$": {
                        "errors": "0",
                        "failures": "0",
                        "tests": "1"
                    },
                    "testsuite": [
                        {
                            "$": {
                                "errors": "0",
                                "failures": "0",
                                "hostname": "",
                                "id": "",
                                "name": "accessibility.login",
                                "package": "accessibility",
                                "skipped": "0",
                                "tests": "1",
                                "time": "4.557",
                                "timestamp": ""
                            },
                            "testcase": [
                                {
                                    "$": {
                                        "assertions": "7",
                                        "classname": "accessibility.login",
                                        "name": "accessibility/login - Launch Login page",
                                        "time": "4.557"
                                    }
                                }
                            ]
                        }
                    ]
                }
            },
            {
                "testsuites": {
                    "$": {
                        "errors": "0",
                        "failures": "1",
                        "tests": "1"
                    },
                    "testsuite": [
                        {
                            "$": {
                                "errors": "0",
                                "failures": "1",
                                "hostname": "",
                                "id": "",
                                "name": "contingency.contingencyTextUser",
                                "package": "contingency",
                                "skipped": "0",
                                "tests": "1",
                                "time": "179.4",
                                "timestamp": ""
                            },
                            "system-err": [
                                "\n            [0;31m Error: Case file not found: ../fixtures/test/client/factFindSingle.json[0m\n            [0;90m at Function.loadCaseFromDisk (/app/pages/caseLoading.js:101:19)\n            at Function.loadCase (/app/pages/caseLoading.js:73:29)\n            at LoginPage.loadCase (/app/pages/basePage.js:254:63)\n            at factFindNavigation (/app/tests/integration/factfindSLMarketingButton.js:29:11)\n            at Object.integration/factfindSLMarketingButton - Single Client logs on to Portal and initiates Fact find\n            journey from Marketing Panel button. (/app/tests/integration/factfindSLMarketingButton.js:13:9)[0m\n        "
                            ],
                            "testcase": [
                                {
                                    "$": {
                                        "assertions": "196",
                                        "classname": "contingency.contingencyTextUser",
                                        "name": "contingency/contingencyTextUser - User navigates to Contingency screens for text validation",
                                        "time": "179.4"
                                    },
                                    "failure": [
                                        {
                                            "$": {
                                                "message": "Timed out while waiting for element <a[href*='/accountOpening']> to be present for 120000 milliseconds. - expected [0;32m\"visible\"[0m but got: [0;31m\"not found\"[0m [0;90m(120004ms)[0m"
                                            },
                                            "_": "\n                at SearchInvestments.selectOpenAccount\n                (/app/pages/searchInvestments/searchInvestments.js:502:14)\n                at Object.contingency/contingencyTextUser - User navigates to Contingency screens for text\n                validation (/app/tests/contingency/contingencyTextUser.js:234:14)\n                at runMicrotasks (<anonymous>)\n            "
                                        },
                                        {
                                            "$": {
                                                "message": "    at SearchInvestments.selectOpenAccount (/app/pages/searchInvestments/searchInvestments.js:502:14)"
                                            },
                                            "_": "\n                at Object.contingency/contingencyTextUser - User navigates to Contingency screens for text\n                validation (/app/tests/contingency/contingencyTextUser.js:234:14)\n                at runMicrotasks (<anonymous>)\n            "
                                        }
                                    ],
                                    "system-out": [
                                        "\n                [[ATTACHMENT|/reports/contingency/contingencyTextUser/contingency/contingencyTextUser---User-navigates-to-Contingency-screens-for-text-validation_FAILED_Jun-11-2020-181545-GMT+0000-(Coordinated-Universal.png]]\n            "
                                    ]
                                }
                            ]
                        }
                    ]
                }
            },
            {
                "testsuites": {
                    "$": {
                        "errors": "0",
                        "failures": "0",
                        "tests": "0"
                    },
                    "testsuite": [
                        {
                            "$": {
                                "errors": "0",
                                "failures": "0",
                                "hostname": "",
                                "id": "",
                                "name": "register.register",
                                "package": "register",
                                "skipped": "9",
                                "tests": "0",
                                "time": "0",
                                "timestamp": ""
                            },
                            "system-err": [
                                "\n      [0;31m  Error: Case file not found: ../fixtures/test/client/factFindSingle.json[0m\n[0;90m       at Function.loadCaseFromDisk (/app/pages/caseLoading.js:101:19)\n       at Function.loadCase (/app/pages/caseLoading.js:73:29)\n       at LoginPage.loadCase (/app/pages/basePage.js:254:63)\n       at factFindNavigation (/app/tests/integration/factfindSLMarketingButton.js:29:11)\n       at Object.integration/factfindSLMarketingButton - Single Client logs on to Portal and initiates Fact find journey from Marketing Panel button. (/app/tests/integration/factfindSLMarketingButton.js:13:9)[0m\n    "
                            ],
                            "testcase": [
                                {
                                    "$": {
                                        "classname": "register.register",
                                        "name": "register/register - Creating a new Self Directed client with an ISA"
                                    },
                                    "skipped": [
                                        ""
                                    ]
                                },
                                {
                                    "$": {
                                        "classname": "register.register",
                                        "name": "Creating a new Self Directed Client who owns a GIA with a manually entered address"
                                    },
                                    "skipped": [
                                        ""
                                    ]
                                },
                                {
                                    "$": {
                                        "classname": "register.register",
                                        "name": "Creating a new Self Directed Client Who owns an ISA and has a Second Correspondance Address"
                                    },
                                    "skipped": [
                                        ""
                                    ]
                                },
                                {
                                    "$": {
                                        "classname": "register.register",
                                        "name": "Creating a new Self Directed Client who has a Second Nationality"
                                    },
                                    "skipped": [
                                        ""
                                    ]
                                },
                                {
                                    "$": {
                                        "classname": "register.register",
                                        "name": "Creating a new Self Directed Client who has a Second Tax Reference and Nationality"
                                    },
                                    "skipped": [
                                        ""
                                    ]
                                },
                                {
                                    "$": {
                                        "classname": "register.register",
                                        "name": "Creating a new Self Directed client who has a SIPP, Manually entered correspondance address and a Joint Building Society Account"
                                    },
                                    "skipped": [
                                        ""
                                    ]
                                },
                                {
                                    "$": {
                                        "classname": "register.register",
                                        "name": "Create a new  Current Partner"
                                    },
                                    "skipped": [
                                        ""
                                    ]
                                },
                                {
                                    "$": {
                                        "classname": "register.register",
                                        "name": "Create a new  Dependant linked to Current Partner"
                                    },
                                    "skipped": [
                                        ""
                                    ]
                                },
                                {
                                    "$": {
                                        "classname": "register.register",
                                        "name": "Create a new  Spouse Linked to Currewnt "
                                    },
                                    "skipped": [
                                        ""
                                    ]
                                }
                            ]
                        }
                    ]
                }
            },
            {
                "testsuites": {
                    "$": {
                        "errors": "0",
                        "failures": "0",
                        "tests": "0"
                    },
                    "testsuite": [
                        {
                            "$": {
                                "errors": "0",
                                "failures": "0",
                                "hostname": "",
                                "id": "",
                                "name": "umbraco.umbracoRegistration",
                                "package": "umbraco",
                                "skipped": "2",
                                "tests": "0",
                                "time": "0",
                                "timestamp": ""
                            },
                            "system-err": [
                                "\n      [0;31m  Error: Case file not found: ../fixtures/test/client/factFindSingle.json[0m\n[0;90m       at Function.loadCaseFromDisk (/app/pages/caseLoading.js:101:19)\n       at Function.loadCase (/app/pages/caseLoading.js:73:29)\n       at LoginPage.loadCase (/app/pages/basePage.js:254:63)\n       at factFindNavigation (/app/tests/integration/factfindSLMarketingButton.js:29:11)\n       at Object.integration/factfindSLMarketingButton - Single Client logs on to Portal and initiates Fact find journey from Marketing Panel button. (/app/tests/integration/factfindSLMarketingButton.js:13:9)[0m\n    "
                            ],
                            "testcase": [
                                {
                                    "$": {
                                        "classname": "umbraco.umbracoRegistration",
                                        "name": "umbraco/umbracoRegistration 1 - Self Directed  client with an ISA, navigate back then forward"
                                    },
                                    "skipped": [
                                        ""
                                    ]
                                },
                                {
                                    "$": {
                                        "classname": "umbraco.umbracoRegistration",
                                        "name": "umbraco/umbracoRegistration 2 - Self Directed  client with an ISA, navigate back then forward"
                                    },
                                    "skipped": [
                                        ""
                                    ]
                                }
                            ]
                        }
                    ]
                }
            }
        ];

        const actual = await allStats(testsuites);

        expect(actual).toStrictEqual([
            {
                "failed": 0,
                "ignored": 0,
                "passed": 1
            },
            {
                "failed": 1,
                "ignored": 0,
                "passed": 0
            },
            {
                "failed": 0,
                "ignored": 9,
                "passed": 0
            },
            {
                "failed": 0,
                "ignored": 2,
                "passed": 0,
            }
        ]);

        done();
    });


});

describe("Combine all statistics", () => {
    it("should add all results together", async (done) => {
        const all = [
            {passed: 1, ignored: 0, failed: 0},
            {passed: 1, ignored: 0, failed: 1},
            {passed: 1, ignored: 1, failed: 0}
        ];

        const actual = await combineStats(all);

        expect(actual).toStrictEqual({passed: 3, ignored: 1, failed: 1});

        done();
    });
});

describe("Add Statistic to Commit", () => {
    it("should add all results together", async (done) => {
        const commit: NightWatchResult = {
            build_id: 1,
            build_url: "http://bk/build/1",
            buildkite_pipeline: "bk_PIPELINE_NAME",
            git_branch_name: "bk_BRANCH",
            git_comment: "bk_MESSAGE",
            git_log: "asdfff012",
            git_username: "bk_BUILD_AUTHOR",
            tests_failed: 0,
            tests_passed: 0,
            tests_ignored: 0
        };
        const testsuites = [
            {
                "testsuites": {
                    "$": {
                        "errors": "0",
                        "failures": "0",
                        "tests": "1"
                    },
                    "testsuite": [
                        {
                            "$": {
                                "errors": "0",
                                "failures": "0",
                                "hostname": "",
                                "id": "",
                                "name": "accessibility.login",
                                "package": "accessibility",
                                "skipped": "0",
                                "tests": "1",
                                "time": "4.557",
                                "timestamp": ""
                            },
                            "testcase": [
                                {
                                    "$": {
                                        "assertions": "7",
                                        "classname": "accessibility.login",
                                        "name": "accessibility/login - Launch Login page",
                                        "time": "4.557"
                                    }
                                }
                            ]
                        }
                    ]
                }
            },
            {
                "testsuites": {
                    "$": {
                        "errors": "0",
                        "failures": "1",
                        "tests": "1"
                    },
                    "testsuite": [
                        {
                            "$": {
                                "errors": "0",
                                "failures": "1",
                                "hostname": "",
                                "id": "",
                                "name": "contingency.contingencyTextUser",
                                "package": "contingency",
                                "skipped": "0",
                                "tests": "1",
                                "time": "179.4",
                                "timestamp": ""
                            },
                            "system-err": [
                                "\n            [0;31m Error: Case file not found: ../fixtures/test/client/factFindSingle.json[0m\n            [0;90m at Function.loadCaseFromDisk (/app/pages/caseLoading.js:101:19)\n            at Function.loadCase (/app/pages/caseLoading.js:73:29)\n            at LoginPage.loadCase (/app/pages/basePage.js:254:63)\n            at factFindNavigation (/app/tests/integration/factfindSLMarketingButton.js:29:11)\n            at Object.integration/factfindSLMarketingButton - Single Client logs on to Portal and initiates Fact find\n            journey from Marketing Panel button. (/app/tests/integration/factfindSLMarketingButton.js:13:9)[0m\n        "
                            ],
                            "testcase": [
                                {
                                    "$": {
                                        "assertions": "196",
                                        "classname": "contingency.contingencyTextUser",
                                        "name": "contingency/contingencyTextUser - User navigates to Contingency screens for text validation",
                                        "time": "179.4"
                                    },
                                    "failure": [
                                        {
                                            "$": {
                                                "message": "Timed out while waiting for element <a[href*='/accountOpening']> to be present for 120000 milliseconds. - expected [0;32m\"visible\"[0m but got: [0;31m\"not found\"[0m [0;90m(120004ms)[0m"
                                            },
                                            "_": "\n                at SearchInvestments.selectOpenAccount\n                (/app/pages/searchInvestments/searchInvestments.js:502:14)\n                at Object.contingency/contingencyTextUser - User navigates to Contingency screens for text\n                validation (/app/tests/contingency/contingencyTextUser.js:234:14)\n                at runMicrotasks (<anonymous>)\n            "
                                        },
                                        {
                                            "$": {
                                                "message": "    at SearchInvestments.selectOpenAccount (/app/pages/searchInvestments/searchInvestments.js:502:14)"
                                            },
                                            "_": "\n                at Object.contingency/contingencyTextUser - User navigates to Contingency screens for text\n                validation (/app/tests/contingency/contingencyTextUser.js:234:14)\n                at runMicrotasks (<anonymous>)\n            "
                                        }
                                    ],
                                    "system-out": [
                                        "\n                [[ATTACHMENT|/reports/contingency/contingencyTextUser/contingency/contingencyTextUser---User-navigates-to-Contingency-screens-for-text-validation_FAILED_Jun-11-2020-181545-GMT+0000-(Coordinated-Universal.png]]\n            "
                                    ]
                                }
                            ]
                        }
                    ]
                }
            },
            {
                "testsuites": {
                    "$": {
                        "errors": "0",
                        "failures": "0",
                        "tests": "0"
                    },
                    "testsuite": [
                        {
                            "$": {
                                "errors": "0",
                                "failures": "0",
                                "hostname": "",
                                "id": "",
                                "name": "register.register",
                                "package": "register",
                                "skipped": "9",
                                "tests": "0",
                                "time": "0",
                                "timestamp": ""
                            },
                            "system-err": [
                                "\n      [0;31m  Error: Case file not found: ../fixtures/test/client/factFindSingle.json[0m\n[0;90m       at Function.loadCaseFromDisk (/app/pages/caseLoading.js:101:19)\n       at Function.loadCase (/app/pages/caseLoading.js:73:29)\n       at LoginPage.loadCase (/app/pages/basePage.js:254:63)\n       at factFindNavigation (/app/tests/integration/factfindSLMarketingButton.js:29:11)\n       at Object.integration/factfindSLMarketingButton - Single Client logs on to Portal and initiates Fact find journey from Marketing Panel button. (/app/tests/integration/factfindSLMarketingButton.js:13:9)[0m\n    "
                            ],
                            "testcase": [
                                {
                                    "$": {
                                        "classname": "register.register",
                                        "name": "register/register - Creating a new Self Directed client with an ISA"
                                    },
                                    "skipped": [
                                        ""
                                    ]
                                },
                                {
                                    "$": {
                                        "classname": "register.register",
                                        "name": "Creating a new Self Directed Client who owns a GIA with a manually entered address"
                                    },
                                    "skipped": [
                                        ""
                                    ]
                                },
                                {
                                    "$": {
                                        "classname": "register.register",
                                        "name": "Creating a new Self Directed Client Who owns an ISA and has a Second Correspondance Address"
                                    },
                                    "skipped": [
                                        ""
                                    ]
                                },
                                {
                                    "$": {
                                        "classname": "register.register",
                                        "name": "Creating a new Self Directed Client who has a Second Nationality"
                                    },
                                    "skipped": [
                                        ""
                                    ]
                                },
                                {
                                    "$": {
                                        "classname": "register.register",
                                        "name": "Creating a new Self Directed Client who has a Second Tax Reference and Nationality"
                                    },
                                    "skipped": [
                                        ""
                                    ]
                                },
                                {
                                    "$": {
                                        "classname": "register.register",
                                        "name": "Creating a new Self Directed client who has a SIPP, Manually entered correspondance address and a Joint Building Society Account"
                                    },
                                    "skipped": [
                                        ""
                                    ]
                                },
                                {
                                    "$": {
                                        "classname": "register.register",
                                        "name": "Create a new  Current Partner"
                                    },
                                    "skipped": [
                                        ""
                                    ]
                                },
                                {
                                    "$": {
                                        "classname": "register.register",
                                        "name": "Create a new  Dependant linked to Current Partner"
                                    },
                                    "skipped": [
                                        ""
                                    ]
                                },
                                {
                                    "$": {
                                        "classname": "register.register",
                                        "name": "Create a new  Spouse Linked to Currewnt "
                                    },
                                    "skipped": [
                                        ""
                                    ]
                                }
                            ]
                        }
                    ]
                }
            },
            {
                "testsuites": {
                    "$": {
                        "errors": "0",
                        "failures": "0",
                        "tests": "0"
                    },
                    "testsuite": [
                        {
                            "$": {
                                "errors": "0",
                                "failures": "0",
                                "hostname": "",
                                "id": "",
                                "name": "umbraco.umbracoRegistration",
                                "package": "umbraco",
                                "skipped": "2",
                                "tests": "0",
                                "time": "0",
                                "timestamp": ""
                            },
                            "system-err": [
                                "\n      [0;31m  Error: Case file not found: ../fixtures/test/client/factFindSingle.json[0m\n[0;90m       at Function.loadCaseFromDisk (/app/pages/caseLoading.js:101:19)\n       at Function.loadCase (/app/pages/caseLoading.js:73:29)\n       at LoginPage.loadCase (/app/pages/basePage.js:254:63)\n       at factFindNavigation (/app/tests/integration/factfindSLMarketingButton.js:29:11)\n       at Object.integration/factfindSLMarketingButton - Single Client logs on to Portal and initiates Fact find journey from Marketing Panel button. (/app/tests/integration/factfindSLMarketingButton.js:13:9)[0m\n    "
                            ],
                            "testcase": [
                                {
                                    "$": {
                                        "classname": "umbraco.umbracoRegistration",
                                        "name": "umbraco/umbracoRegistration 1 - Self Directed  client with an ISA, navigate back then forward"
                                    },
                                    "skipped": [
                                        ""
                                    ]
                                },
                                {
                                    "$": {
                                        "classname": "umbraco.umbracoRegistration",
                                        "name": "umbraco/umbracoRegistration 2 - Self Directed  client with an ISA, navigate back then forward"
                                    },
                                    "skipped": [
                                        ""
                                    ]
                                }
                            ]
                        }
                    ]
                }
            }
        ];

        const actual = await addStatsToCommit(testsuites, commit);

        expect(actual).toStrictEqual({
            build_id: 1,
            build_url: "http://bk/build/1",
            buildkite_pipeline: "bk_PIPELINE_NAME",
            git_branch_name: "bk_BRANCH",
            git_comment: "bk_MESSAGE",
            git_log: "asdfff012",
            git_username: "bk_BUILD_AUTHOR",
            tests_failed: 1,
            tests_ignored: 11,
            tests_passed: 1
        });

        done();
    });
});
