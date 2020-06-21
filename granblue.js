const userOrderId = [
    "6714587",
    "15469318",
    "11638583",
    "9877479",
    "8314113",
    "16444282",
    "17532210",
    "15599971",
    "17950624",
    "22422135",
    "31491232",
    "15819860",
    "5937340",
    "26301831",
    "23919748",
    "8954127",
    "10337077",
    "22061266",
    "26180925",
    "26355702",
    "8306704",
    "25302136",
    "8429444",
    "1346605",
    "29312384",
    "7359492",
    "31329205",
    "31269523",
    "10320234",
    "24228081"
];
const memberList = [];
const i = 0;

for (let i = 0; i < userOrderId.length; i++) {

    memberList.push({ order: i + 1, id: userOrderId[i], name: '', score: "0" });
}

const rawFromGBF1 = {
    "member_list":
    {
        "list": [
            { "id": "23919748", "name": "Kuantw", "level": "227", "pc_image": "310901_sw_1_01", "summon_image": "2040090000", "contribution": 126182745, "last_login_at": "1\u6642\u9593\u4ee5\u5185", "rank": 1 }, { "id": "15599971", "name": "Szeth", "level": "187", "pc_image": "220301_kt_1_01", "summon_image": "2040167000", "contribution": 123363093, "last_login_at": "1\u6642\u9593\u4ee5\u5185", "rank": 2 }, { "id": "15819860", "name": "Mero", "level": "147", "pc_image": "300301_sw_1_01", "summon_image": "2040034000", "contribution": 103751362, "last_login_at": "1\u6642\u9593\u4ee5\u5185", "rank": 3 }, { "id": "31491232", "name": "\u6c34\u6ce2\u86cb", "level": "163", "pc_image": "220301_kt_1_01", "summon_image": "2040028000_02", "contribution": 100350636, "last_login_at": "1\u6642\u9593\u4ee5\u5185", "rank": 4 }, { "id": "17950624", "name": "\u30ca\u30eb", "level": "163", "pc_image": "310901_sw_1_01", "summon_image": "2040027000_02", "contribution": 100082235, "last_login_at": "1\u6642\u9593\u4ee5\u5185", "rank": 5 }
        ], "first": 1, "last": 1, "prev": 0, "next": 1, "count": 5, "current": "1"
    }, "view_count": 5, "status": 0
}

const rawFromGBF2 = {
    "member_list":
    {
        "list": [
        ], "first": 1, "last": 1, "prev": 0, "next": 1, "count": 5, "current": "1"
    }, "view_count": 5, "status": 0
}

const rawFromGBF3 = {
    "member_list":
    {
        "list": [
        ], "first": 1, "last": 1, "prev": 0, "next": 1, "count": 5, "current": "1"
    }, "view_count": 5, "status": 0
}

const rawFromGBF = [...rawFromGBF1.member_list.list, ...rawFromGBF2.member_list.list, ...rawFromGBF3.member_list.list];

const analysis = ($array) => {
    for (const [key, value] of Object.entries(memberList)) {
        rawFromGBF.map((data) => {
            if (data.id == value.id) {
                value.name = data.name
                value.score = data.contribution
            }
        })
    }
}

analysis(rawFromGBF)

console.log(memberList)
        // const memberList = [...rawFromGBF1.member_list.list, ...rawFromGBF2.member_list.list, ...rawFromGBF3.member_list.list];

        // const analysis = ($array) => {
        //     for (let item of $array) {
        //         userOrder.list[item.name].score = item.contribution;
        //         userOrder.list[item.name].level = item.level;
        //     }
        // };

        // analysis(memberList);

        // userOrderRaw.forEach((item) => {
        //     const obj = userOrder.list[item];
        //     console.log(`${obj}`);
        // });