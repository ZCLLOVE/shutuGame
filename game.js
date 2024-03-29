function toggleClass(element) {
        if (element.classList.contains('becheck')) {
            element.classList.remove('becheck');
        } else {
            element.classList.add('becheck');
        }
        if (checkGridItems()) {
            alert("你真棒！")
        }

}

 var isMouseButtonDown = false;

  // 当鼠标按下时设置标志
  document.addEventListener('mousedown', function(e) {
    isMouseButtonDown = true;
  });

  // 当鼠标松开时清除标志
  document.addEventListener('mouseup', function(e) {
    isMouseButtonDown = false;
  });

function gameLoad(gridContainer,gridHead,gridLeft) {
    // 生成随机数，表示每行和每列的 div 数量
    var rowCount = Math.floor(Math.random() * 5) + 5; // 行数范围为
    var colCount = rowCount
    var n = 1
    var map = new Map();
    // 创建宫格
    for (var i = 0; i < rowCount; i++) {
        var gridRow = document.createElement('div');
        gridRow.className = 'grid-row';
        for (var j = 0; j < colCount; j++) {
            var gridItem = document.createElement('div');
            gridItem.className = 'grid-item';
            gridItem.setAttribute('onclick', 'toggleClass(this)')
            let addr = i + 1 + '-' + (j + 1)
            gridItem.setAttribute('id', addr)
            let flag = false
            // 根据0.7的概率赋予名为 "becheck" 的属性
            if (Math.random() <= 0.7) {
                gridItem.setAttribute('name', 'becheck'); // 设置名为 "becheck" 的属性
                flag = true
            }
            var key1 = 0 + '-' + (j + 1)
            var key2 = (i + 1) + '-' + 0
            updateMap(map, key1, flag);
            updateMap(map, key2, flag);
            gridRow.appendChild(gridItem);
        }
        gridContainer.appendChild(gridRow);
    }
    for (let i = 1;i<=colCount;i++){
        let val = countOnesHead(map.get('0-'+i))+''
        var headItem = document.createElement('div');
        headItem.innerHTML=val
        headItem.classList='grid-head-item'
        gridHead.appendChild(headItem)
    }
    for (let i = 1;i<=rowCount;i++){
        let val = countOnes(map.get(i+'-0'))
        var leftItem = document.createElement('div');
        leftItem.innerHTML=val
        leftItem.classList='grid-left-item'
        gridLeft.appendChild(leftItem)
    }
    console.log(map)
}
function countOnes(input) {
    let count = 0;
    let result = '';
    for (let i = 0; i < input.length; i++) {
        if (input[i] === '1') {
            count++;
        } else if (count > 0) {
            result += count+" ";
            count = 0;
        }
    }
    if (count > 0) {
        result += count;
    }
    // 添加一个检查以避免返回NaN
    return result === '' ? 0 : result;
}
function countOnesHead(input) {
    let count = 0;
    let result = '';
    for (let i = 0; i < input.length; i++) {
        if (input[i] === '1') {
            count++;
        } else if (count > 0) {
            result += count+"<br>";
            count = 0;
        }
    }
    if (count > 0) {
        result += count;
    }
    // 添加一个检查以避免返回NaN
    return result === '' ? 0 : result;
}
function updateMap(map, key, flag) {
    if (map.has(key)) {
        let val = map.get(key);
        map.set(key, val + (flag ? '1' : '0'));
    } else {
        map.set(key, flag ? '1' : '0');
    }
}

// 定义一个函数来检查是否所有grid-item都满足条件
function checkGridItems() {
    // 初始化一个变量来跟踪是否所有元素都满足条件
    var allSatisfied = true;

    // 获取gridContainer中所有class为grid-item的div元素
    var gridItems = document.querySelectorAll('.grid-item');

    // 遍历每一个grid-item
    for (var i = 0; i < gridItems.length; i++) {
        var gridItem = gridItems[i];
        var hasBecheck = gridItem.classList.contains('becheck');
        var hasNameAttribute = gridItem.hasAttribute('name');

        // 检查是否满足条件
        if ((hasBecheck && !hasNameAttribute) || (!hasBecheck && hasNameAttribute)) {
            // 如果当前元素不满足条件，设置allSatisfied为false并跳出循环
            allSatisfied = false;
            break;
        }
    }

    // 返回检查结果
    return allSatisfied;
}
