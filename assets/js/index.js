// FOOD TYPE Const
// const FOOD_TYPE_KOREAN = "korean";
// const FOOD_TYPE_JAPANESE = "japanese"
// const FOOD_TYPE_CHINESE = "chinese";
// const FOOD_TYPE_FASTFOOD = "fastfood";

const FOOD_TYPE_NORMAL = "normal";
const FOOD_TYPE_CUSTOM = "custom";

const list = [
    {
        type: FOOD_TYPE_NORMAL,
        item: [
            "풍미연",
            "육갑",
            "심슨부대찌개",
            "김가네 숯불갈비",
            "대아 감자탕",
            "신사골 감자탕",
            "생고기 김치찌개",
            "고향추어탕",
            "신주옥미 순대국",
            "부자 감자탕",
            "강릉 짬뽕 순두부",
            "우쿠야 돈까스",
            "김가네 김밥",
            "깨돌이김밥",
            "갈마칼국수",
            "장지리막국수",
            "백년가",
        ]
    },
    {
        type: FOOD_TYPE_CUSTOM,
        item: [
            "연희 Pick",
            "주정 Pick",
            "지석 Pick",
            "백철 Pick",
            "영환 Pick",
            "호만 Pick",
            "완수 Pick",
            "세영 Pick",
            "재진 Pick",
        ]
    },
];

const result = [];

const shuffleArray = (array) => {
    // array.sort(() => Math.random() - 1);
    for (let index = array.length - 1; index > 0; index--) {
        const randomPosition = Math.floor(Math.random() * (index + 1));
        const temporary = array[index];
        array[index] = array[randomPosition];
        array[randomPosition] = temporary;
    }
}

const initRandomList = () => {
    // 초기화
    result.length = 0;

    const bonusPickContainer = document.querySelector(".bonus-pick__container");
    bonusPickContainer.innerHTML = '';
}

const composeRandomList = () => {
    list.forEach(category => {
        category.item.forEach(item => {
            result.push({
                type: category.type,
                name: item.toString(),
            });
        })
    })

    shuffleArray(result);
}

const renderRandomList = () => {
    const container = document.querySelector(".slot-machine__container .list");
    const template = document.querySelector("#slot-item__template").innerHTML;

    const bonusPickContainer = document.querySelector(".bonus-pick__container");
    const bonusPickTemplate = document.querySelector("#bonus-pick__item__template").innerHTML;

    let html = '';
    for (let i = 0; i < result.length; i++) {
        html += template
            .replace(/{name}/g, result[i].name);
    }

    container.innerHTML = html;

    container.classList.remove("rolling");
    setTimeout(() => {
        container.classList.add("rolling");
    }, 0);

    // Bonus Pick
    if (result.length > 1) {
        setTimeout(() => {
            bonusPickContainer.innerHTML =
                bonusPickTemplate.replace(/{name}/g, result[1].name);
        }, 5000);
    }
}

const getRandomResult = () => {
    result.length = 0;

    // Random Result Set
    let resultCount = 0;
    const resultMaxSize = 5;

    while (resultCount < resultMaxSize) {
        const randomTypeValue = list[Math.floor(Math.random() * list.length)];
        const targetType = randomTypeValue.type;
        const targetItem = randomTypeValue.item;

        const pickedItem = targetItem[Math.floor(Math.random() * targetItem.length)];

        // 같은 타입의 음식이 2개까지만 선택되도록 예외 처리
        const checkDuplicateType = result.filter(item => {
            return item.type === targetType;
        });

        if (checkDuplicateType.length > 1) {
            continue;
        }

        // 동일 식당은 결과에서 제외하는 로직
        const checkDuplicateItem = result.filter(item => {
            return item.type === targetType && item.name === pickedItem;
        });

        if (checkDuplicateItem.length > 0) {
            continue;
        }

        result.push({
            type: targetType,
            name: pickedItem,
        });

        resultCount++;
    }

    result.sort((a, b) => {
        return a.type === b.type ? 0 : 1;
    });
}

const renderRandomResult = () => {
    const container = document.querySelector('.container .content');
    const template = document.querySelector('#item__template').innerHTML;

    let html = '';
    for (let i = 0; i < result.length; i++) {
        html += template
            .replace(/{type}/g, result[i].type)
            .replace(/{name}/g, result[i].name);
    }

    container.innerHTML = html;
}

document.addEventListener("DOMContentLoaded", function() {
    const refreshButton = document.querySelector('.container .refresh-button');
    refreshButton.addEventListener("click", () => {
        initRandomList();
        composeRandomList();
        renderRandomList();
    });
});