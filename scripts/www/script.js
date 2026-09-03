const sixGods = ['daan', 'liulian', 'suxi', 'chikou', 'xiaoji', 'kongwang'];
const sixGodNames = {
    'daan': '大安',
    'liulian': '留连',
    'suxi': '速喜',
    'chikou': '赤口',
    'xiaoji': '小吉',
    'kongwang': '空亡'
};
const fiveElements = ['木', '木', '火', '金', '水', '土'];
const fiveElementsColors = {
    '木': '#4CAF50',
    '火': '#F44336',
    '土': '#FFC107',
    '金': '#9E9E9E',
    '水': '#2196F3'
};
const positionToGan = {
    'daan': ['甲', '乙'],
    'liulian': ['丙', '丁'],
    'suxi': ['戊', '己'],
    'chikou': ['庚', '辛'],
    'xiaoji': ['壬', '癸'],
    'kongwang': ['戊', '己']
};
const ganzhi = {
    'daan': '甲寅',
    'liulian': '乙卯',
    'suxi': '丙午',
    'chikou': '庚申',
    'xiaoji': '壬子',
    'kongwang': '戊己'
};
const hourTable = [
    { chinese: '子', range: '23:00-00:59', index: 1, earthlyBranch: '子', element: '水' },
    { chinese: '丑', range: '01:00-02:59', index: 2, earthlyBranch: '丑', element: '土' },
    { chinese: '寅', range: '03:00-04:59', index: 3, earthlyBranch: '寅', element: '木' },
    { chinese: '卯', range: '05:00-06:59', index: 4, earthlyBranch: '卯', element: '木' },
    { chinese: '辰', range: '07:00-08:59', index: 5, earthlyBranch: '辰', element: '土' },
    { chinese: '巳', range: '09:00-10:59', index: 6, earthlyBranch: '巳', element: '火' },
    { chinese: '午', range: '11:00-12:59', index: 7, earthlyBranch: '午', element: '火' },
    { chinese: '未', range: '13:00-14:59', index: 8, earthlyBranch: '未', element: '土' },
    { chinese: '申', range: '15:00-16:59', index: 9, earthlyBranch: '申', element: '金' },
    { chinese: '酉', range: '17:00-18:59', index: 10, earthlyBranch: '酉', element: '金' },
    { chinese: '戌', range: '19:00-20:59', index: 11, earthlyBranch: '戌', element: '土' },
    { chinese: '亥', range: '21:00-22:59', index: 12, earthlyBranch: '亥', element: '水' }
];
const earthlyBranchToSixGod = {
    '寅': '青龙', '卯': '青龙',
    '巳': '朱雀', '午': '朱雀',
    '丑': '勾陈', '辰': '勾陈',
    '未': '螣蛇', '戌': '螣蛇',
    '申': '白虎', '酉': '白虎',
    '亥': '玄武', '子': '玄武'
};
const elementRelationships = {
    '木': { '生': '火', '克': '土', '被生': '水', '被克': '金' },
    '火': { '生': '土', '克': '金', '被生': '木', '被克': '水' },
    '土': { '生': '金', '克': '水', '被生': '火', '被克': '木' },
    '金': { '生': '水', '克': '木', '被生': '土', '被克': '火' },
    '水': { '生': '木', '克': '火', '被生': '金', '被克': '土' }
};
const fiveStarOrder = ['木星', '火星', '土星', '金星', '水星', '天空'];

function displayCalculationSteps(month, day, hour, monthStart, dayResult, hourResult, finalResult) {
    const stepsDisplay = document.getElementById('steps-display');
    if (!stepsDisplay) return;
    const activeMethodElement = document.querySelector('.method-btn.active');
    const activeMethod = activeMethodElement ? activeMethodElement.getAttribute('data-method') : 'numbers';
    const methodText = activeMethod === 'date' ? '时间起卦' : '数字起卦';
    stepsDisplay.innerHTML = '';
    const steps = [
        { number: '01', title: `确定起卦方式: ${methodText}`, description: activeMethod === 'date' ? `使用选择的时间信息进行起卦` : `使用输入的三个数字作为月、日、时进行起卦` },
        { number: '02', title: `确定月、日、时参数`, description: `月数: ${month}, 日数: ${day}, 时数: ${hour}`, formula: `参数: 月=${month}, 日=${day}, 时=${hour}` },
        { number: '03', title: `月上起日计算`, description: `从大安（起点）开始，先数到月数对应的位置，再从该位置数到日数对应的位置`, formula: `月上起日 = (起点${monthStart} + 月数${month} - 1 + 日数${day} - 1) % 6 = ${(monthStart + month - 1 + day - 1) % 6}` },
        { number: '04', title: `确定日落地支`, description: `日落地支为: ${sixGodNames[sixGods[dayResult]]}`, formula: `日落宫位 = ${sixGodNames[sixGods[dayResult]]}` },
        { number: '05', title: `日上起时计算`, description: `从日落地支位置开始，数到时数对应的位置`, formula: `日上起时 = (日落宫位${dayResult} + 时数${hour} - 1) % 6 = ${hourResult}` },
        { number: '06', title: `确定最终落宫`, description: `最终落宫为: ${sixGodNames[finalResult]}`, formula: `最终结果 = ${sixGodNames[finalResult]}` },
        { number: '07', title: `确定五行属性`, description: `${sixGodNames[finalResult]}对应的五行属性为: ${fiveElements[hourResult]}`, formula: `五行属性 = ${fiveElements[hourResult]}` },
        { number: '08', title: `确定干支属性`, description: `${sixGodNames[finalResult]}对应的干支为: ${ganzhi[finalResult]}`, formula: `干支属性 = ${ganzhi[finalResult]}` }
    ];
    steps.forEach(step => {
        const stepItem = document.createElement('div');
        stepItem.className = 'step-item';
        let stepHTML = `<div class="step-title"><span class="step-number">${step.number}</span>${step.title}</div><div class="step-description">${step.description}</div>`;
        if (step.formula) stepHTML += `<div class="step-formula">${step.formula}</div>`;
        stepItem.innerHTML = stepHTML;
        stepsDisplay.appendChild(stepItem);
    });
}

const interpretations = {
    'daan': { name: '大安', basic: '大吉大利，百事顺遂。代表平安、顺利、吉祥。谋事可成，婚姻美满，出行平安，疾病不药而愈。', combinations: { 'daan': '双重吉利，万事如意', 'liulian': '先吉后阻，需耐心等待', 'suxi': '速战速决，马到成功', 'chikou': '吉中带凶，需谨慎行事', 'xiaoji': '吉祥如意，小利可得', 'kongwang': '吉处藏凶，事有阻碍' } },
    'liulian': { name: '留连', basic: '凶多吉少，办事迟缓。代表纠缠、拖延、阻碍。谋事难成，婚姻有阻，出行不利，疾病缠绵。', combinations: { 'daan': '先阻后吉，终有好结果', 'liulian': '双重阻碍，难以成功', 'suxi': '虽有阻碍，终会成功', 'chikou': '凶上加凶，灾祸临头', 'xiaoji': '困境中有机遇', 'kongwang': '完全受阻，宜守不宜进' } },
    'suxi': { name: '速喜', basic: '大吉之兆，百事顺遂。代表迅速、喜庆、成功。谋事速成，婚姻喜庆，出行顺利，疾病速愈。', combinations: { 'daan': '大吉大利，万事如意', 'liulian': '先吉后缓，不宜操之过急', 'suxi': '双喜临门，运势亨通', 'chikou': '先喜后忧，需防意外', 'xiaoji': '喜庆连连，小利不断', 'kongwang': '喜中有忧，事有变数' } },
    'chikou': { name: '赤口', basic: '大凶之兆，百事不利。代表口舌、是非、争斗。谋事不成，婚姻不顺，出行有灾，疾病加重。', combinations: { 'daan': '凶中带吉，化险为夷', 'liulian': '凶上加凶，大祸临头', 'suxi': '先凶后吉，转危为安', 'chikou': '双重凶险，灾难重重', 'xiaoji': '凶中有机，小吉可求', 'kongwang': '凶多吉少，宜守不宜进' } },
    'xiaoji': { name: '小吉', basic: '吉祥之兆，小利可得。代表小吉、顺利、进展。谋事小成，婚姻顺利，出行平安，疾病好转。', combinations: { 'daan': '大吉小吉，万事如意', 'liulian': '小有阻碍，终会成功', 'suxi': '喜上加喜，运势亨通', 'chikou': '小有不顺，需防口舌', 'xiaoji': '双重小吉，步步顺利', 'kongwang': '吉中带凶，事有变数' } },
    'kongwang': { name: '空亡', basic: '凶兆，百事无成。代表空虚、无望、失败。谋事不成，婚姻难成，出行不利，疾病难愈。', combinations: { 'daan': '凶中带吉，终有转机', 'liulian': '完全失败，不宜行动', 'suxi': '先凶后吉，峰回路转', 'chikou': '大凶之兆，灾祸临头', 'xiaoji': '小吉化解，转危为安', 'kongwang': '双重空亡，一事无成' } }
};

function solarToLunar(solarDate) {
    const year = solarDate.getFullYear();
    const month = solarDate.getMonth() + 1;
    const day = solarDate.getDate();
    let lunarMonth = month;
    let lunarDay = day;
    if (month === 1 && day <= 20) {
        lunarMonth = 12;
        lunarDay = day + 10;
    }
    return { year, month: lunarMonth, day: lunarDay };
}

function getCurrentHour() {
    const now = new Date();
    const hour = now.getHours();
    if (hour >= 23 || hour < 1) return 1;
    if (hour >= 1 && hour < 3) return 2;
    if (hour >= 3 && hour < 5) return 3;
    if (hour >= 5 && hour < 7) return 4;
    if (hour >= 7 && hour < 9) return 5;
    if (hour >= 9 && hour < 11) return 6;
    if (hour >= 11 && hour < 13) return 7;
    if (hour >= 13 && hour < 15) return 8;
    if (hour >= 15 && hour < 17) return 9;
    if (hour >= 17 && hour < 19) return 10;
    if (hour >= 19 && hour < 21) return 11;
    return 12;
}

function displayTimeInfo(year, month, day, hour, minute) {
    const timeInfoElement = document.getElementById('time-info');
    if (timeInfoElement) {
        timeInfoElement.textContent = `${year}年${month}月${day}日 ${hour}时${minute}分`;
    } else {
        const newTimeInfo = document.createElement('div');
        newTimeInfo.id = 'time-info';
        newTimeInfo.className = 'time-info';
        newTimeInfo.textContent = `${year}年${month}月${day}日 ${hour}时${minute}分`;
        document.body.appendChild(newTimeInfo);
    }
}

function generateLunarDays() {
    const lunarDaySelect = document.getElementById('day-select');
    if(!lunarDaySelect) return;
    lunarDaySelect.innerHTML = '';
    for (let i = 1; i <= 30; i++) {
        const option = document.createElement('option');
        option.value = i;
        option.textContent = i + '日';
        lunarDaySelect.appendChild(option);
    }
}

function initDateTimePickers() {
    generateLunarDays();
    const lunarHourSelect = document.getElementById('hour-select');
    if(!lunarHourSelect) return;
    lunarHourSelect.innerHTML = '';
    hourTable.forEach(item => {
        const option = document.createElement('option');
        option.value = item.index;
        option.textContent = item.chinese + '时';
        lunarHourSelect.appendChild(option);
    });
    const now = new Date();
    const lunar = solarToLunar(now);
    document.getElementById('month-select').value = lunar.month;
    document.getElementById('day-select').value = lunar.day;
    document.getElementById('hour-select').value = getCurrentHour();
}

function initMethodSwitch() {
    const methodBtns = document.querySelectorAll('.method-btn');
    methodBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            methodBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const method = btn.getAttribute('data-method');
            document.getElementById('date-method').style.display = method === 'date' ? 'flex' : 'none';
            document.getElementById('number-method').style.display = method === 'number' ? 'flex' : 'none';
        });
    });
    const numberInputs = [
        { input: document.getElementById('number-1'), result: document.getElementById('num-result-1'), min:1, max:12 },
        { input: document.getElementById('number-2'), result: document.getElementById('num-result-2'), min:1, max:31 },
        { input: document.getElementById('number-3'), result: document.getElementById('num-result-3'), min:1, max:12 }
    ];
    numberInputs.forEach(({input,result,min,max})=>{
        if(input && result){
            input.addEventListener('input',()=>{
                let value = input.value.replace(/\D/g,'');
                let num = parseInt(value)||1;
                num = Math.min(Math.max(num,min),max);
                input.value = num;
                result.textContent = num;
            })
        }
    })
}

function calculate() {
    let month, day, hour;
    let currentTimeInfo = '';
    const activeMethodElement = document.querySelector('.method-btn.active');
    const activeMethod = activeMethodElement ? activeMethodElement.getAttribute('data-method') : 'numbers';
    if(activeMethod === 'date'){
        const monthSelect = document.getElementById('month-select');
        const daySelect = document.getElementById('day-select');
        const hourSelect = document.getElementById('hour-select');
        month = monthSelect ? parseInt(monthSelect.value):1;
        day = daySelect ? parseInt(daySelect.value):1;
        hour = hourSelect ? parseInt(hourSelect.value):1;
        const now = new Date();
        currentTimeInfo = `${now.getFullYear()}年${month}月${day}日 ${getHourDisplay(hour)}时`;
    }else{
        const n1 = document.getElementById('number-1');
        const n2 = document.getElementById('number-2');
        const n3 = document.getElementById('number-3');
        month = n1 ? parseInt(n1.value)||1:1;
        day = n2 ? parseInt(n2.value)||1:1;
        hour = n3 ? parseInt(n3.value)||1:1;
        const now = new Date();
        currentTimeInfo = `${now.getFullYear()}年${now.getMonth()+1}月${now.getDate()}日 ${now.getHours()}时${now.getMinutes()}分`;
    }
    const timeInfoElement = document.getElementById('time-info');
    if(timeInfoElement) timeInfoElement.textContent = currentTimeInfo;
    const monthStart = 0;
    const dayResult = (monthStart + month -1 + day -1) %6;
    const hourResult = (dayResult + hour -1) %6;
    const finalResult = sixGods[hourResult];
    const resultName = sixGodNames[finalResult];
    const element = fiveElements[hourResult];
    updateGridCells(finalResult, dayResult);
    displayCalculationSteps(month,day,hour,monthStart,dayResult,hourResult,finalResult);
    saveToHistory(month,day,hour,finalResult,element);
    updateShareLink(month,day,hour);
    return {month,day,hour,result:finalResult,resultName,element};
}

function getHourDisplay(hourIndex){
    const hourNames = ['','子','丑','寅','卯','辰','巳','午','未','申','酉','戌','亥'];
    return hourNames[hourIndex] || hourIndex;
}

const shengeMapping = {'daan':'自身','liulian':'','suxi':'妻财','chikou':'父母','xiaoji':'兄弟','kongwang':'子孙'};

function createGridCell(data, isFinalResult=false, isDayResult=false){
    data = {
        god:data.god||'',element:data.element||'木',ganzhi:data.ganzhi||'',palace:data.palace||'',position:data.position||1,
        shenge:data.shenge||'',liuqin:data.liuqin||'',liuqinRelationship:data.liuqinRelationship||'',fiveStar:data.fiveStar||'',
        month:data.month||'',day:data.day||'',hour:data.hour||'',earthlyBranch:data.earthlyBranch||'',earthlyBranchElement:data.earthlyBranchElement||'',
        isSelfPosition:data.isSelfPosition||false,validationInfo:data.validationInfo||{}
    };
    const cell = document.createElement('div');
    cell.className = 'grid-cell';
    if(isFinalResult) cell.classList.add('final-result');
    if(isDayResult) cell.classList.add('day-result');
    cell.setAttribute('data-god', data.god.toLowerCase());
    cell.setAttribute('data-element', data.element);
    cell.setAttribute('data-position', data.position);

    const content = document.createElement('div');
    content.className = 'cell-content';

    if(data.month || data.day || data.hour){
        const tagsContainer = document.createElement('div');
        tagsContainer.className = 'time-tags-container';
        const unifiedTag = document.createElement('div');
        unifiedTag.className = 'time-tag';
        let tagContent = [];
        if(data.month) tagContent.push('月');
        if(data.day) tagContent.push('日');
        if(data.hour) tagContent.push('时');
        unifiedTag.textContent = tagContent.join(' ');
        tagsContainer.appendChild(unifiedTag);
        cell.appendChild(tagsContainer);
    }

    const top = document.createElement('div');
    top.className = 'cell-top';
    const godName = document.createElement('div');
    godName.className = 'god-name';
    godName.textContent = data.god || '未知神名';
    if(data.isSelfPosition) godName.classList.add('self-position');
    top.appendChild(godName);

    if(data.liuqin){
        const liuqinContainer = document.createElement('div');
        liuqinContainer.className = 'liuqin-container';
        const liuqin = document.createElement('div');
        liuqin.className = 'liuqin';
        liuqin.textContent = data.liuqin;
        if(data.isSelfPosition) liuqin.classList.add('self-liuqin');
        liuqinContainer.appendChild(liuqin);
        top.appendChild(liuqinContainer);
    }

    const middle = document.createElement('div');
    middle.className = 'cell-middle';

    const ganzhi = document.createElement('div');
    ganzhi.className = 'ganzhi';
    ganzhi.textContent = data.ganzhi ? data.ganzhi.charAt(0):'';
    middle.appendChild(ganzhi);

    if(data.earthlyBranch && data.earthlyBranchElement){
        const ebc = document.createElement('div');
        ebc.className = 'earthly-branch-container';
        const eb = document.createElement('div');
        eb.className = 'earthly-branch';
        eb.textContent = data.earthlyBranch;
        const ebe = document.createElement('div');
        ebe.className = 'earthly-branch-element';
        ebe.textContent = `(${data.earthlyBranchElement})`;
        ebc.appendChild(eb);
        ebc.appendChild(ebe);
        middle.appendChild(ebc);
    }

    const fiveStarContainer = document.createElement('div');
    fiveStarContainer.className = 'five-star-container';
    const fiveStar = document.createElement('div');
    fiveStar.className = 'five-star';
    fiveStar.textContent = data.fiveStar;
    fiveStarContainer.appendChild(fiveStar);

    const sixGodElement = document.createElement('div');
    sixGodElement.className = 'six-god';
    const sixGodByEarthlyBranch = {'寅':'青龙','卯':'青龙','巳':'朱雀','午':'朱雀','丑':'勾陈','辰':'勾陈','未':'螣蛇','戌':'螣蛇','申':'白虎','酉':'白虎','亥':'玄武','子':'玄武'};
    let displayedSixGod = sixGodByEarthlyBranch[data.earthlyBranch] || '未知';
    sixGodElement.textContent = displayedSixGod;
    fiveStarContainer.appendChild(sixGodElement);
    middle.appendChild(fiveStarContainer);

    const elementBar = document.createElement('div');
    elementBar.className = 'element-bar';
    elementBar.style.backgroundColor = fiveElementsColors[data.element];

    content.appendChild(top);
    content.appendChild(middle);
    cell.appendChild(content);
    cell.appendChild(elementBar);

    cell.addEventListener('click',()=>showDetailedInfo(data));
    return cell;
}

function showDetailedInfo(cellData){
    if(!cellData.validationInfo) return;
    const dialog = document.createElement('div');
    dialog.className = 'info-dialog';
    dialog.innerHTML = `
    <div class="dialog-header">
        <h3>详细信息</h3>
        <button class="close-btn">×</button>
    </div>
    <div class="dialog-content">
        <div class="content-wrapper">
            <div class="basic-info">
                <p><strong>宫位：</strong><span class="value">${cellData.god} (第${cellData.position}位)</span></p>
                <p><strong>干支：</strong><span class="value">${cellData.ganzhi}</span></p>
                <p><strong>地支：</strong><span class="value">${cellData.earthlyBranch}</span></p>
                <p><strong>五行属性：</strong><span class="value">${cellData.validationInfo.element}</span></p>
                <p><strong>六神：</strong><span class="value">${cellData.validationInfo.sixGod}</span></p>
                <p><strong>六亲：</strong><span class="value">${cellData.validationInfo.liuqin}</span></p>
                <p><strong>五星：</strong><span class="value">${cellData.validationInfo.fiveStar}</span></p>
            </div>
            <div class="validation-section">
                <h4>校准验证信息</h4>
                <p><strong>时辰落宫：</strong><span class="value">${cellData.validationInfo.isHourPosition?'是':'否'}</span></p>
                <p><strong>日落宫位：</strong><span class="value">${cellData.validationInfo.isDayPosition?'是':'否'}</span></p>
                <p><strong>月落宫位：</strong><span class="value">${cellData.validationInfo.isMonthPosition?'是':'否'}</span></p>
            </div>
        </div>
    </div>
    `;
    document.body.appendChild(dialog);
    dialog.querySelector('.close-btn').addEventListener('click',()=>dialog.remove());
    dialog.addEventListener('click',(e)=>{if(e.target===dialog) dialog.remove()});
}

function updateGridCells(finalResult, dayResult){
    const gridContainer = document.getElementById('grid-container');
    if(gridContainer) gridContainer.innerHTML='';
    let currentMonth=1,currentDay=1,currentHour=1;
    const activeMethodElement = document.querySelector('.method-btn.active');
    const activeMethod = activeMethodElement ? activeMethodElement.getAttribute('data-method'):'numbers';
    if(activeMethod==='date'){
        const ms = document.getElementById('month-select');
        const ds = document.getElementById('day-select');
        const hs = document.getElementById('hour-select');
        currentMonth = ms?parseInt(ms.value):1;
        currentDay = ds?parseInt(ds.value):1;
        currentHour = hs?parseInt(hs.value):1;
    }else{
        const n1 = document.getElementById('number-1');
        const n2 = document.getElementById('number-2');
        const n3 = document.getElementById('number-3');
        currentMonth = n1?parseInt(n1.value)||1:1;
        currentDay = n2?parseInt(n2.value)||1:1;
        currentHour = n3?parseInt(n3.value)||1:1;
    }
    const monthStart = 0;
    const monthPosition = (monthStart + currentMonth -1) %6;
    const calcDayPosition = (monthStart + currentMonth -1 + currentDay -1) %6;
    const calcHourPosition = (calcDayPosition + currentHour -1) %6;
    const hourInfo = hourTable[currentHour-1];
    const myEarthlyBranch = hourInfo.earthlyBranch;
    const myElement = hourInfo.element;
    const gridData = [];
    const allEarthlyBranches = ['子','丑','寅','卯','辰','巳','午','未','申','酉','戌','亥'];
    sixGods.forEach((god,index)=>{
        let monthInfo='',dayInfo='',hourInfo='';
        if(index === monthPosition) monthInfo = `月：${currentMonth}`;
        if(index === calcDayPosition) dayInfo = `日：${currentDay}`;
        if(index === calcHourPosition) hourInfo = `时：${hourTable[currentHour-1].chinese}`;

        const hourBranchIndex = allEarthlyBranches.indexOf(myEarthlyBranch);
        const positionDiff = (index - calcHourPosition +6)%6;
        const branchOffset = positionDiff *2;
        const targetBranchIndex = (hourBranchIndex + branchOffset) % allEarthlyBranches.length;
        const cellEarthlyBranch = allEarthlyBranches[targetBranchIndex];

        const gansForPosition = positionToGan[god];
        const isYangBranch = targetBranchIndex %2 ===0;
        const selectedGan = isYangBranch ? gansForPosition[0] : gansForPosition[1];
        const cellGanzhi = selectedGan + cellEarthlyBranch;

        let dragonStartPosition =0;
        switch(myEarthlyBranch){
            case '子':case '午': dragonStartPosition=0;break;
            case '丑':case '未': dragonStartPosition=1;break;
            case '寅':case '申': dragonStartPosition=2;break;
            case '卯':case '酉': dragonStartPosition=3;break;
            case '辰':case '戌': dragonStartPosition=4;break;
            case '巳':case '亥': dragonStartPosition=5;break;
        }
        const sixGodOrder = ['青龙','朱雀','勾陈','白虎','玄武','腾蛇'];
        const offset = (index - dragonStartPosition +6)%6;
        let cellSixGod = sixGodOrder[offset] || '未知';

        const hItem = hourTable.find(h=>h.earthlyBranch === cellEarthlyBranch);
        const cellElement = hItem ? hItem.element : '土';
        const isSelfPosition = index === calcHourPosition;
        let cellLiuqin = '';
        if(isSelfPosition){
            cellLiuqin = '自身';
        }else{
            if(elementRelationships[cellElement]['生'] === myElement) cellLiuqin='父母';
            else if(elementRelationships[myElement]['生'] === cellElement) cellLiuqin='子孙';
            else if(cellElement === myElement) cellLiuqin='兄弟';
            else if(elementRelationships[myElement]['克'] === cellElement) cellLiuqin='妻财';
            else if(elementRelationships[cellElement]['克'] === myElement) cellLiuqin='官鬼';
        }
        const fiveStarOffset = (index - calcDayPosition +6)%6;
        const cellFiveStar = fiveStarOrder[fiveStarOffset];
        const validationInfo = {
            position:index+1,earthlyBranch:cellEarthlyBranch,element:cellElement,sixGod:cellSixGod,
            liuqin:cellLiuqin,fiveStar:cellFiveStar,isHourPosition:index===calcHourPosition,
            isDayPosition:index===calcDayPosition,isMonthPosition:index===monthPosition
        };
        gridData.push({
            god:sixGodNames[god],element:fiveElements[index],ganzhi:cellGanzhi,palace:sixGodNames[god],position:index+1,
            shenge:shengeMapping[god],liuqin:cellLiuqin,fiveStar:cellFiveStar,sixGod:cellSixGod,
            month:monthInfo,day:dayInfo,hour:hourInfo,earthlyBranch:cellEarthlyBranch,earthlyBranchElement:cellElement,
            isSelfPosition,isDayResult:index===dayResult,isFinalResult:index===sixGods.indexOf(finalResult),validationInfo
        })
    })
    const correctLayoutOrder = [1,2,3,0,5,4];
    correctLayoutOrder.forEach(idx=>{
        const d = gridData[idx];
        const cell = createGridCell(d, sixGods[idx]===finalResult, sixGods[idx]===sixGods[dayResult]);
        gridContainer.appendChild(cell);
    })
    const chartContainer = document.querySelector('.chart-container');
    if(chartContainer) createVisualization(finalResult,dayResult);
}

function createVisualization(finalResult, dayResult){
    const chartContainer = document.querySelector('.chart-container');
    if(!chartContainer) return;
    chartContainer.innerHTML = '';
    const svg = document.createElementNS('http://www.w3.org/2000/svg','svg');
    svg.setAttribute('width','100%');
    svg.setAttribute('height','200');
    for(let i=0;i<=6;i++){
        const line = document.createElementNS('http://www.w3.org/2000/svg','line');
        line.setAttribute('x1',`${i*16.67}%`);
        line.setAttribute('y1','0');
        line.setAttribute('x2',`${i*16.67}%`);
        line.setAttribute('y2','200');
        line.setAttribute('stroke','rgba(255,255,255,0.1)');
        svg.appendChild(line);
    }
    let pathData='M';
    sixGods.forEach((god,idx)=>{
        const x = (idx*16.67)+8.33;
        let y=100;
        if(god === finalResult) y=50;
        else if(god === sixGods[dayResult]) y=75;
        pathData += `${x}% ${y} `;
        const circle = document.createElementNS('http://www.w3.org/2000/svg','circle');
        circle.setAttribute('cx',`${x}%`);
        circle.setAttribute('cy',y);
        circle.setAttribute('r', god===finalResult?10:6);
        circle.setAttribute('fill', god===finalResult ? fiveElementsColors[fiveElements[idx]]:'rgba(255,255,255,0.7)');
        circle.setAttribute('stroke', god===finalResult?'#fff':'rgba(255,255,255,0.5)');
        circle.setAttribute('stroke-width','2');
        svg.appendChild(circle);
        const text = document.createElementNS('http://www.w3.org/2000/svg','text');
        text.setAttribute('x',`${x}%`);
        text.setAttribute('y', god===finalResult? y-20:y-15);
        text.setAttribute('text-anchor','middle');
        text.setAttribute('fill','#fff');
        text.setAttribute('font-size','14');
        text.textContent = sixGodNames[god];
        svg.appendChild(text);
    })
    const path = document.createElementNS('http://www.w3.org/2000/svg','path');
    path.setAttribute('d',pathData);
    path.setAttribute('fill','none');
    path.setAttribute('stroke','rgba(255,255,255,0.3)');
    path.setAttribute('stroke-width','2');
    svg.appendChild(path);
    chartContainer.appendChild(svg);
}

function showInterpretationModal(god){
    const modal = document.getElementById('interpretation-modal');
    document.getElementById('modal-god-name').textContent = interpretations[god].name;
    document.getElementById('modal-basic-interpretation').textContent = interpretations[god].basic;
    const combWrap = document.getElementById('modal-combinations');
    combWrap.innerHTML='';
    Object.entries(interpretations[god].combinations).forEach(([k,v])=>{
        const item = document.createElement('div');
        item.className='combination-item';
        item.innerHTML=`<p><span class="combination-name">${sixGodNames[k]}：</span><span class="combination-desc">${v}</span></p>`;
        combWrap.appendChild(item);
    })
    modal.classList.add('active');
    document.body.style.overflow='hidden';
}

function closeInterpretationModal(){
    const modal = document.getElementById('interpretation-modal');
    modal.classList.remove('active');
    document.body.style.overflow='auto';
}

function saveToHistory(month,day,hour,result,element){
    const history = JSON.parse(localStorage.getItem('xlrHistory')||'[]');
    const now = new Date();
    const record = {
        timestamp:now.getTime(),
        dateStr:now.toLocaleString('zh-CN',{year:'numeric',month:'2-digit',day:'2-digit',hour:'2-digit',minute:'2-digit'}),
        month,day,hour,method:document.querySelector('.method-btn.active').dataset.method,
        result,resultName:sixGodNames[result],element
    };
    history.unshift(record);
    if(history.length>20) history.pop();
    localStorage.setItem('xlrHistory',JSON.stringify(history));
    loadHistory();
}

function loadHistory(){
    const list = document.getElementById('history-list');
    if(!list) return;
    list.innerHTML='';
    const history = JSON.parse(localStorage.getItem('xlrHistory')||'[]');
    if(history.length===0){
        list.innerHTML = '<div class="empty-history">暂无历史记录</div>';
        return;
    }
    history.forEach(record=>{
        const item = document.createElement('div');
        item.className='history-item';
        item.innerHTML = `
        <div class="history-info">
            <span class="history-time">${record.dateStr}</span>
            <span class="history-method">${record.method==='date'?'时间起卦':'数字起卦'}</span>
        </div>
        <div class="history-result">
            <span class="result-name">${record.resultName}</span>
            <span class="result-element" style="color:${fiveElementsColors[record.element]}">${record.element}</span>
        </div>
        `;
        item.addEventListener('click',()=>{
            document.querySelectorAll('.method-btn').forEach(b=>{
                if(b.dataset.method === record.method) b.click();
            })
            if(record.method === 'date'){
                document.getElementById('month-select').value = record.month;
                document.getElementById('day-select').value = record.day;
                document.getElementById('hour-select').value = record.hour;
            }else{
                document.getElementById('number-1').value = record.month;
                document.getElementById('number-2').value = record.day;
                document.getElementById('number-3').value = record.hour;
                document.getElementById('num-result-1').textContent=record.month;
                document.getElementById('num-result-2').textContent=record.day;
                document.getElementById('num-result-3').textContent=record.hour;
            }
            calculate();
        })
        list.appendChild(item);
    })
}

function clearHistory(){
    if(confirm('确定要清空所有历史记录吗？')){
        localStorage.removeItem('xlrHistory');
        loadHistory();
    }
}

function updateShareLink(month,day,hour){
    const method = document.querySelector('.method-btn.active').dataset.method;
    const baseUrl = window.location.origin + window.location.pathname;
    const params = new URLSearchParams();
    params.append('method',method);
    params.append('m',month);
    params.append('d',day);
    params.append('h',hour);
    const shareUrl = `${baseUrl}?${params.toString()}`;
    const link = document.getElementById('share-link');
    link.href = shareUrl;
    link.textContent = '复制链接';
    link.onclick = async (e)=>{
        e.preventDefault();
        await navigator.clipboard.writeText(shareUrl);
        link.textContent = '已复制';
        setTimeout(()=>link.textContent='复制链接',2000);
    }
}

function parseShareLink(){
    const params = new URLSearchParams(window.location.search);
    const method = params.get('method');
    const m = Number(params.get('m'));
    const d = Number(params.get('d'));
    const h = Number(params.get('h'));
    if(!method || !m || !d || !h) return;
    document.querySelectorAll('.method-btn').forEach(b=>{
        if(b.dataset.method === method) b.click();
    })
    if(method === 'date'){
        document.getElementById('month-select').value = m;
        document.getElementById('day-select').value = d;
        document.getElementById('hour-select').value = h;
    }else{
        document.getElementById('number-1').value = m;
        document.getElementById('number-2').value = d;
        document.getElementById('number-3').value = h;
        document.getElementById('num-result-1').textContent=m;
        document.getElementById('num-result-2').textContent=d;
        document.getElementById('num-result-3').textContent=h;
    }
    calculate();
}

function showToast(msg){
    let toast = document.querySelector('.toast-message');
    if(toast) toast.remove();
    toast = document.createElement('div');
    toast.className='toast-message';
    toast.textContent = msg;
    document.body.appendChild(toast);
    setTimeout(()=>toast.classList.add('show'),10);
    setTimeout(()=>{
        toast.classList.remove('show');
        setTimeout(()=>toast.remove(),300);
    },3000);
}

function createParticles(){
    const container = document.getElementById('particles-container');
    container.innerHTML='';
    const count = 22;
    for(let i=0;i<count;i++){
        const p = document.createElement('div');
        p.className='particle';
        p.style.left = `${Math.random()*100}%`;
        p.style.top = `${Math.random()*100}%`;
        const size = Math.random()*2+1;
        p.style.width = `${size}px`;
        p.style.height = `${size}px`;
        p.style.opacity = Math.random()*0.2+0.05;
        p.style.animationDuration = `${Math.random()*30+20}s`;
        p.style.animationDelay = `${Math.random()*10}s`;
        container.appendChild(p);
    }
}

function toggleTheme(){
    document.body.classList.toggle('dark-theme');
    const isDark = document.body.classList.contains('dark-theme');
    localStorage.setItem('xlrTheme', isDark?'dark':'light');
    const pathEl = document.querySelector('.theme-toggle svg path');
    if(isDark){
        pathEl.setAttribute('d','M12 3c-4.97 0-9 4.03-9 9s4.03 9 9 9 9-4.03 9-9c0-.46-.04-.92-.1-1.36-.98 1.37-2.58 2.26-4.4 2.26-2.98 0-5.4-2.42-5.4-5.4 0-1.81.89-3.42 2.26-4.4-.44-.06-.9-.1-1.36-.1z');
    }else{
        pathEl.setAttribute('d','M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z');
    }
}

function initTheme(){
    const saved = localStorage.getItem('xlrTheme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if(saved === 'dark' || (!saved && prefersDark)){
        document.body.classList.add('dark-theme');
        const pathEl = document.querySelector('.theme-toggle svg path');
        pathEl.setAttribute('d','M12 3c-4.97 0-9 4.03-9 9s4.03 9 9 9 9-4.03 9-9c0-.46-.04-.92-.1-1.36-.98 1.37-2.58 2.26-4.4 2.26-2.98 0-5.4-2.42-5.4-5.4 0-1.81.89-3.42 2.26-4.4-.44-.06-.9-.1-1.36-.1z');
    }
}

async function exportResult(){
    showToast('导出需要html2canvas库支持');
}

function init(){
    initTheme();
    createParticles();
    initDateTimePickers();
    initMethodSwitch();
    loadHistory();
    parseShareLink();

    document.getElementById('calculate-btn').addEventListener('click',calculate);
    document.getElementById('current-time-btn').addEventListener('click',()=>{
        const now = new Date();
        const lunar = solarToLunar(now);
        document.getElementById('month-select').value = lunar.month;
        document.getElementById('day-select').value = lunar.day;
        document.getElementById('hour-select').value = getCurrentHour();
        document.querySelector('.method-btn[data-method="date"]').click();
        calculate();
    });

    const expBtn = document.getElementById('export-btn');
    if(expBtn) expBtn.addEventListener('click',exportResult);

    const clearBtn = document.querySelector('.clear-history');
    if(clearBtn) clearBtn.addEventListener('click',clearHistory);

    const closeModalBtn = document.querySelector('.close-modal');
    if(closeModalBtn) closeModalBtn.addEventListener('click',closeInterpretationModal);

    const themeBtn = document.querySelector('.theme-toggle');
    if(themeBtn) themeBtn.addEventListener('click',toggleTheme);

    const modal = document.getElementById('interpretation-modal');
    if(modal){
        modal.addEventListener('click',(e)=>{
            if(e.target === modal) closeInterpretationModal();
        })
    }

    document.addEventListener('keydown',(e)=>{
        if(e.key === 'Escape') closeInterpretationModal();
    })

    const now = new Date();
    const timeInfoEl = document.getElementById('time-info');
    if(timeInfoEl){
        timeInfoEl.textContent = `${now.getFullYear()}年${now.getMonth()+1}月${now.getDate()}日 ${now.getHours()}时${now.getMinutes()}分`;
    }
}

window.addEventListener('load', init);
