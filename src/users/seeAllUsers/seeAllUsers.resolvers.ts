import {Resolvers} from "../../types";
import {protectedResolver} from "../users.utils";

const resolvers: Resolvers = {
    Query: {
        seeAllUsers: protectedResolver(async (_, {keyword, page, keywordOption, sortOption}, {loggedUser, client}) => {

                if (loggedUser.id != 2) {
                    return {
                        ok: false,
                        error: "유저 목록은 관리자만 가능합니다."
                    }
                }

                let users;
                let totalPages;

                if (!keyword) {
                    if (sortOption == "createAt") {
                        users = await client.user.findMany({
                            where: {
                                id: {
                                    not: loggedUser.id
                                }
                            },
                            orderBy: {
                                createAt: "desc",
                            },
                            take: 10,
                            skip: (page - 1) * 10,
                        });
                    } else if (sortOption == "companyName") {
                        users = await client.user.findMany({
                            where: {
                                id: {
                                    not: loggedUser.id
                                }
                            },
                            orderBy: {
                                companyName: "asc"
                            },
                            take: 10,
                            skip: (page - 1) * 10,
                        });
                    } else if (sortOption == "qrcodeCount") {
                        users = await client.user.findMany({
                            where: {
                                id: {
                                    not: loggedUser.id
                                }
                            },
                            orderBy: {
                                qrcodeCount: "desc"
                            },
                            take: 10,
                            skip: (page - 1) * 10,
                        });
                    } else {
                        users = await client.user.findMany({
                            where: {
                                id: {
                                    not: loggedUser.id
                                }
                            },
                            orderBy: {
                                userActivate: "asc",
                            },
                            take: 10,
                            skip: (page - 1) * 10,
                        });
                    }
                    totalPages = await client.user.count({
                        where: {
                            id: {
                                not: loggedUser.id,
                            },
                        },
                    });
                } else {
                    if(keywordOption == "userName"){
                        if (sortOption == "createAt") {
                            users = await client.user.findMany({
                                where: {
                                    id: {
                                        not: loggedUser.id
                                    },
                                    userName: {
                                        startsWith: keyword.toLowerCase(),
                                    }
                                },
                                orderBy: {
                                    createAt: "desc",
                                },
                                take: 10,
                                skip: (page - 1) * 10,
                            });
                        } else if (sortOption == "companyName") {
                            users = await client.user.findMany({
                                where: {
                                    id: {
                                        not: loggedUser.id
                                    },
                                    userName: {
                                        startsWith: keyword.toLowerCase(),
                                    }
                                },
                                orderBy: {
                                    companyName: "asc"
                                },
                                take: 10,
                                skip: (page - 1) * 10,
                            });
                        } else if (sortOption == "qrcodeCount") {
                            users = await client.user.findMany({
                                where: {
                                    id: {
                                        not: loggedUser.id
                                    },
                                    userName: {
                                        startsWith: keyword.toLowerCase(),
                                    }
                                },
                                orderBy: {
                                    qrcodeCount: "desc"
                                },
                                take: 10,
                                skip: (page - 1) * 10,
                            });
                        } else {
                            users = await client.user.findMany({
                                where: {
                                    id: {
                                        not: loggedUser.id
                                    },
                                    userName: {
                                        startsWith: keyword.toLowerCase(),
                                    }
                                },
                                orderBy: {
                                    userActivate: "asc",
                                },
                                take: 10,
                                skip: (page - 1) * 10,
                            });
                        }
                        totalPages = await client.user.count({
                            where: {
                                id: {
                                    not: loggedUser.id,
                                },
                                userName: {
                                    startsWith: keyword.toLowerCase(),
                                }
                            },
                        });
                    }else{
                        if (sortOption == "createAt") {
                            users = await client.user.findMany({
                                where: {
                                    id: {
                                        not: loggedUser.id
                                    },
                                    companyName: {
                                        startsWith: keyword.toLowerCase(),
                                    }
                                },
                                orderBy: {
                                    createAt: "desc",
                                },
                                take: 10,
                                skip: (page - 1) * 10,
                            });
                        } else if (sortOption == "companyName") {
                            users = await client.user.findMany({
                                where: {
                                    id: {
                                        not: loggedUser.id
                                    },
                                    companyName: {
                                        startsWith: keyword.toLowerCase(),
                                    }
                                },
                                orderBy: {
                                    companyName: "asc"
                                },
                                take: 10,
                                skip: (page - 1) * 10,
                            });
                        } else if (sortOption == "qrcodeCount") {
                            console.log("qrcodeCount3");
                            users = await client.user.findMany({
                                where: {
                                    id: {
                                        not: loggedUser.id
                                    },
                                    companyName: {
                                        startsWith: keyword.toLowerCase(),
                                    }
                                },
                                orderBy: {
                                    qrcodeCount: "desc"
                                },
                                take: 10,
                                skip: (page - 1) * 10,
                            });
                        } else {
                            users = await client.user.findMany({
                                where: {
                                    id: {
                                        not: loggedUser.id
                                    },
                                    companyName: {
                                        startsWith: keyword.toLowerCase(),
                                    }
                                },
                                orderBy: {
                                    userActivate: "asc",
                                },
                                take: 10,
                                skip: (page - 1) * 10,
                            });
                        }
                        totalPages = await client.user.count({
                            where: {
                                id: {
                                    not: loggedUser.id,
                                },
                                companyName: {
                                    startsWith: keyword.toLowerCase(),
                                }
                            },
                        });
                    }
                }

                return {
                    ok: true,
                    users,
                    totalPages,
                }
            }
        )
    }
}

export default resolvers;