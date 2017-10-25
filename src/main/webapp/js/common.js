function trim(str) {
    var pos = 0;
    while (pos < str.length && str.charAt(pos) == " ") {
        str = str.substr(1, str.length);
    }
    pos = str.length - 1;
    while (pos >= 0 && pos < str.length && str.charAt(pos) == " ") {
        str = str.substr(0, str.length - 1);
        pos = str.length - 1;
    }
    return str;
}

function isIntegerNumber(str) {
    var pattern = "1234567890";
    for (var i = 0; i < str.length; i++) {
        var pos = 0;

        for (var j = 0; j < pattern.length; j++) {
            //alert(str.substr(i, 1)+" = "+pattern.substr(j, 1));
            if (str.substr(i, 1) == pattern.substr(j, 1)) {
                pos = 1;
                break;
            }
        }
        if (pos == 0)
            return false;
    }
    if (str.length > 1 && str.substr(0, 1) == "0")
        return false;
    return true;
}


function isIntegerNumber1(str) {
    var pattern = "1234567890";
    for (var i = 0; i < str.length; i++) {
        var pos = 0;

        for (var j = 0; j < pattern.length; j++) {
            if (str.substr(i, 1) == pattern.substr(j, 1)) {
                pos = 1;
                break;
            }
        }
        if (pos == 0)
            return false;
    }
    return true;
}

function isDoubleNumber(str) {

    var pattern = "1234567890.";
    var pointCount = 0;
    for (var i = 0; i < str.length; i++) {
        var pos = 0;
        for (var j = 0; j < pattern.length; j++) {
            if (str.substr(i, 1) == pattern.substr(j, 1)) {
                pos = 1;
                break;
            }
        }
        if (pos == 0)
            return false;
        if (str.substr(i, 1) == ".")
            pointCount++;
    }
    if (str.substr(0, 1) == "." || str.substr(str.length - 1, 1) == ".")
        return false;
    if (pointCount > 1)
        return false;
    return true;
}

function isDataCorrect(y, m, d) {
    if ((m == 1 || m == 3 || m == 5 || m == 7 || m == 8 || m == 10 || m == 12) && d >= 1 && d <= 31) {
        return true;
    }
    if ((m == 4 || m == 6 || m == 9 || m == 11) && d >= 1 && d <= 30) {
        return true;
    }
    if (m == 2) {
        if (y % 4 == 0) {
            if (d >= 1 && d <= 28)
                return true;
        } else {
            if (d >= 1 && d <= 29)
                return true;
        }
    }
    return false;
}

/**
 * Method return numeric value (integer or double) of a string
 * @param str - some string value
 */
function getNumberValue(str) {
    return str * 1;
}

function inserOption(selID, opt) {
    if (navigator.appName.toLowerCase().indexOf("microsoft") >= 0) {
        document.getElementById(selID).add(opt);
    } else {
        document.getElementById(selID).appendChild(opt);
    }
}


function readCookie(name) {
    var nameSG = name + "=";
    var nuller = '';
    if (document.cookie.indexOf(nameSG) == -1) {
        return nuller;
    }
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameSG) == 0) {
            return c.substring(nameSG.length, c.length);
        }
    }
    return null;
}

function newCookie(name, value, days) {
    if (days == 0) {
        var days = 360;
    }
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        var expires = "; expires=" + date.toGMTString();
    } else {
        var expires = "";
    }
    document.cookie = name + "=" + value + expires + "; path=/";
}

function eraseCookie(name) {
    newCookie(name, "", -1);
}

function centeropen(url, winwidth, winheight) {
    var centerwin = window.open(url, "", "toolbar=1, resize=1, scrollbars=1, status=1");

    centerwin.resizeTo(winwidth, winheight)
    centerwin.moveTo(screen.width / 2 - winwidth / 2, screen.height / 2 - winheight / 2)
}

// required
// required-double
// required-int

var commonFunc = {};

commonFunc.convertToJSDate = function(date){
    if(date == null || date == ""){
        return "";
    }
    return new Date(date.year, date.month - 1,date.day)
    //return '' + commonFunc.twoFormat(date.day) + '-' + commonFunc.twoFormat(date.month) + '-' + date.year;
};

commonFunc.convertToArtaDate = function(date){
    if(date == null || date == ""){
        return null;
    }
    if (date instanceof Date) {
        var year = date.getFullYear ? date.getFullYear() : date.getYear() + 1900;
        return {year: year, month: (date.getMonth() + 1), day: date.getDate()};
    }

    // TODO: check date format
    var dateArr = date.split('-');
    return  {year:parseInt(dateArr[2]), month:parseInt(dateArr[1]),day:parseInt(dateArr[0])};
};

commonFunc.convertToDDMMYYYY = function(date){
    if(date == null || date == ""){
        return null;
    }
    if (date instanceof Date) {
        var year = date.getFullYear ? date.getFullYear() : date.getYear() + 1900;
        return commonFunc.twoFormat(date.getDate())+'-'+(commonFunc.twoFormat(date.getMonth()+1))+'-'+year;
    }
    return null;
};

commonFunc.convertToJSDateDefault = function(date, defaultDate){
    return commonFunc.convertToJSDate(date == undefined ? defaultDate : date);
};

commonFunc.twoFormat = function(i){
    if(i<10) return '0'+i;
    return i;
};

commonFunc.txtBoxValidate = function(obj){
    if(obj.value.length>0) {
        $(obj).removeClass('invalid-control');
    } else {
        $(obj).addClass('invalid-control')
    }
};

commonFunc.checkDate = function(dateStr){
    //TODO: dd-MM-yyyy format
    if(dateStr == null){
        return false;
    }
    if(dateStr.split("-").length != 3){
        return false;
    }
    if(dateStr.split("-")[0].length != 2 || dateStr.split("-")[1].length != 2 || dateStr.split("-")[2].length != 4){
        return false;
    }
    //if(!isNaN(dateStr.split("-")[0]) || !isNaN(dateStr.split("-")[1]) || !isNaN(dateStr.split("-")[2])){
    //    return false;
    //}

    return true;
}
commonFunc.Required = function(){
    $('.required').each(function(){
        $(this).change(function(){
            if(this.value.length>0) {
                $(this).removeClass('invalid-control');
            } else {
                $(this).addClass('invalid-control')
            }
        })

    });
}
commonFunc.RequiredDouble = function(){
    $('.required-double').each(function(){
        $(this).change(function(){
        if(this.value.length>0 && isDoubleNumber(this.value)) {
            $(this).removeClass('invalid-control');
        } else {
            $(this).addClass('invalid-control')
        }
    });
    });
}
commonFunc.RequiredInt = function(){
    $('.required-int').each(function(){
        $(this).change(function(){
        if(this.value.length>0 && isIntegerNumber(this.value)) {
            $(this).removeClass('invalid-control');
        } else {
            $(this).addClass('invalid-control')
        }
    });
    });
}
commonFunc.isValid = function(){
    if($('.invalid-control').length>0) {
        $('.invalid-control')[0].focus();
        return false;
    }
    return true;
};
commonFunc.scrollTop = function(){
   document.body.scrollTop = document.documentElement.scrollTop = 0;
}
commonFunc.getMonthList = function(rootScope){
    var months = [];
    if(rootScope != undefined) {
        months.push({ID: 1, name: rootScope.msgs('January')});
        months.push({ID: 2, name: rootScope.msgs('February')});
        months.push({ID: 3, name: rootScope.msgs('March')});
        months.push({ID: 4, name: rootScope.msgs('April')});
        months.push({ID: 5, name: rootScope.msgs('May')});
        months.push({ID: 6, name: rootScope.msgs('June')});
        months.push({ID: 7, name: rootScope.msgs('July')});
        months.push({ID: 8, name: rootScope.msgs('August')});
        months.push({ID: 9, name: rootScope.msgs('September')});
        months.push({ID: 10, name: rootScope.msgs('October')});
        months.push({ID: 11, name: rootScope.msgs('November')});
        months.push({ID: 12, name: rootScope.msgs('December')});
    }
    return months;
};
commonFunc.getCurrentMonthDaysCount = function(year,month){
    if (month == 2) {
        if (year % 4 == 0)
            return 29;
        else
            return 28;
    } else if (month == 4 || month == 6 || month == 9 || month == 11) {
        return 30;
    }
    return 31;
}
commonFunc.zeroOrValue = function(value){
    if(value){
        return value;
    } else {
        return 0;
    }
};
commonFunc.getLanguageID = function(language){
    if(language == "ru") {
        return 1;
    } else if(language == "kz") {
        return 2;
    } else if(language == "en") {
        return 3;
    }
    return 1;
};



var PltArrayModule = (function () {
    var moveToBeginning = function (array, propertyName, id) {
        var element = removeElement(array, propertyName, id);
        if (element){
            array.unshift(element);
        }
    };
    var moveToEnding = function (array, propertyName, id) {
        var element = removeElement(array, propertyName, id);
        if (element){
            array.push(element);
        }
    };
    var removeElement = function (array, propertyName, id) {
        for (var index = 0; index < array.length; index++) {
            if (array[index][propertyName] == id) {
                var element = array[index];
                array.splice(index, 1);
                return element;
            }
        }
        return null;
    };

    return {
        moveToBeginning: moveToBeginning,
        moveToEnding: moveToEnding,
        removeElement: removeElement
    };
})();

var PltNumberModule = (function () {
    var roundWithPrecision = function (number, power) {
        var n = Math.pow(10, power);
        return Math.round(number * n) / n;
    };

    return {
        roundWithPrecision: roundWithPrecision
    };
})();

var PltValidationModule = (function () {
    var isNumber = function (str) {
        var pattern = /^\d+$/; // Matches any decimal digit. Equivalent to [0-9]
        return pattern.test(str);
    };
    var isEmpty = function (str) {
        if (str == undefined || str == null) {
            return true;
        } else {
            var pattern =/\S+/; // match any non-white space character [^\r\n\t\f ]
            return !pattern.test(str);
        }
    };
    var isIIN = function (str) {
        var pattern = /^\d{12}$/; // Matches any decimal digit with length 12
        return pattern.test(str);
    };
    var isEmail = function (str) {
        var pattern = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;
        return pattern.test(str);
    };

    return {
        isNumber: isNumber,
        isEmpty: isEmpty,
        isIIN: isIIN,
        isEmail: isEmail
    };
})();

var PltDateModule = (function () {
    var dayDifference = function (startDate, endDate) {
        return Math.floor(Math.abs(endDate-startDate)/(1000*60*60*24));
    };

    return {
        dayDifference: dayDifference
    };
})();

var PltDomManipulation = (function () {
    var toggleVisibility = function (elementID) {
        var element = document.getElementById(elementID);
        if (element.style.visibility === 'hidden') {
            element.style.visibility = 'visible';
        } else {
            element.style.visibility = 'hidden';
        }
    };
    var toggleDisplay = function (elementID) {
        var element = document.getElementById(elementID);
        if (element.style.display === 'none') {
            element.style.display = 'block';
        } else {
            element.style.display = 'none';
        }
    };

    var changeVisibility = function (isVisible, elementID) {
        var element = document.getElementById(elementID);
        element.style.visibility = isVisible ? 'visible' : 'hidden';
    };

    var changeDisplay = function (isVisible, elementID) {
        var element = document.getElementById(elementID);
        element.style.display = isVisible ? 'block' : 'none';
    };

    return {
        toggleVisibility: toggleVisibility,
        toggleDisplay: toggleDisplay,
        changeVisibility: changeVisibility,
        changeDisplay: changeDisplay
    };
})();