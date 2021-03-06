//--------------- async page initialization calls ---------------

$.when(
    ajaxGetVideoURLData(),
    ajaxGetTOCData(),
    ajaxGetUtteranceData(),
    ajaxGetCommentaryData(),
    ajaxGetPhotoData(),
    ajaxGetMissionStagesData(),
    ajaxGetVideoSegmentData()).done(function(){
        // the code here will be executed when all ajax requests resolve.
        gApplicationReady += 1;
        trace("APPREADY: Ajax loaded: " + gApplicationReady);

        setTimeout(function(){
                populatePhotoGallery();
            },500);
    });

//--------------- index file handling --------------------

function ajaxGetVideoURLData() {
    if (gCdnEnabled && window.location.href.indexOf(".dev") == -1) {
        var cdnNum = getRandomInt(1, 5);
        var urlStr = "http://cdn" + cdnNum + ".apollo17.org";
    } else {
        urlStr = ".";
    }
    urlStr += "/indexes/videoURLData.csv";
    urlStr += gStopCache == true ? "?stopcache=" + Math.random() : "";
    return $.ajax({
        type: "GET",
        url: urlStr,
        dataType: "text",
        success: function(data) {processVideoURLData(data);}
    });
}
function ajaxGetTOCData() {
    if (gCdnEnabled && window.location.href.indexOf(".dev") == -1) {
        var cdnNum = getRandomInt(1, 5);
        var urlStr = "http://cdn" + cdnNum + ".apollo17.org";
    } else {
        urlStr = ".";
    }
    urlStr += "/indexes/TOCData.csv";
    urlStr += gStopCache == true ? "?stopcache=" + Math.random() : "";
    return $.ajax({
        type: "GET",
        url: urlStr,
        dataType: "text",
        success: function(data) {processTOCData(data);}
    });
}
function ajaxGetUtteranceData() {
    if (gCdnEnabled && window.location.href.indexOf(".dev") == -1) {
        var cdnNum = getRandomInt(1, 5);
        var urlStr = "http://cdn" + cdnNum + ".apollo17.org";
    } else {
        urlStr = ".";
    }
    urlStr += "/indexes/utteranceData.csv";
    urlStr += gStopCache == true ? "?stopcache=" + Math.random() : "";
    return $.ajax({
        type: "GET",
        url: urlStr,
        dataType: "text",
        success: function(data) {processUtteranceData(data);}
    });
}
function ajaxGetCommentaryData() {
    if (gCdnEnabled && window.location.href.indexOf(".dev") == -1) {
        var cdnNum = getRandomInt(1, 5);
        var urlStr = "http://cdn" + cdnNum + ".apollo17.org";
    } else {
        urlStr = ".";
    }
    urlStr += "/indexes/commentaryData.csv";
    urlStr += gStopCache == true ? "?stopcache=" + Math.random() : "";
    return $.ajax({
        type: "GET",
        url: urlStr,
        dataType: "text",
        success: function(data) {processCommentaryData(data);}
    });
}
function ajaxGetPhotoData() {
    if (gCdnEnabled && window.location.href.indexOf(".dev") == -1) {
        var cdnNum = getRandomInt(1, 5);
        var urlStr = "http://cdn" + cdnNum + ".apollo17.org";
    } else {
        urlStr = ".";
    }
    urlStr += "/indexes/photoData.csv";
    urlStr += gStopCache == true ? "?stopcache=" + Math.random() : "";
    return $.ajax({
        type: "GET",
        url: urlStr,
        dataType: "text",
        success: function(data) {processPhotoData(data);}
    });
}
function ajaxGetMissionStagesData() {
    if (gCdnEnabled && window.location.href.indexOf(".dev") == -1) {
        var cdnNum = getRandomInt(1, 5);
        var urlStr = "http://cdn" + cdnNum + ".apollo17.org";
    } else {
        urlStr = ".";
    }
    urlStr += "/indexes/missionStagesData.csv";
    urlStr += gStopCache == true ? "?stopcache=" + Math.random() : "";
    return $.ajax({
        type: "GET",
        url: urlStr,
        dataType: "text",
        success: function(data) {processMissionStagesData(data);}
    });
}
function ajaxGetVideoSegmentData() {
    if (gCdnEnabled && window.location.href.indexOf(".dev") == -1) {
        var cdnNum = getRandomInt(1, 5);
        var urlStr = "http://cdn" + cdnNum + ".apollo17.org";
    } else {
        urlStr = ".";
    }
    urlStr += "/indexes/videoSegmentData.csv";
    urlStr += gStopCache == true ? "?stopcache=" + Math.random() : "";
    return $.ajax({
        type: "GET",
        url: urlStr,
        dataType: "text",
        success: function(data) {processVideoSegmentData(data);}
    });
}
function processVideoURLData(allText) {
    //console.log("processVideoURLData");
    var allTextLines = allText.split(/\r\n|\n/);
    for (var i = 0; i < allTextLines.length; i++) {
        var data = allTextLines[i].split('|');

        var rec = [];
        rec.push(data[0]);
        rec.push(data[1]);
        rec.push(data[2]);
        rec.push(data[3]);
        gMediaList.push(rec);
    }
}
function processTOCData(allText) {
    //console.log("processTOCIndexData");
    var allTextLines = allText.split(/\r\n|\n/);
    var curRow = 0;
    for (var i = 0; i < allTextLines.length; i++) {
        var data = allTextLines[i].split('|');
        if (data[0] != "") {
            gTOCIndex[i] = data[0];
            gTOCDataLookup[data[0]] = curRow;
            data[0] = timeIdToTimeStr(data[0]);
            gTOCData.push(data);
            curRow++;
        }
    }
}
function processUtteranceData(allText) {
    //console.log("processUtteranceData");
    var allTextLines = allText.split(/\r\n|\n/);
    var curRow = 0;
    for (var i = 0; i < allTextLines.length; i++) {
        var data = allTextLines[i].split('|');
        if (data[0] != "") {
            gUtteranceDataLookup[data[0]] = curRow;
            gUtteranceIndex[i] = data[0];
            gUtteranceData.push(data);
            curRow ++;
        }
    }
}
function processCommentaryData(allText) {
    //console.log("processCommentaryIndexData");
    var allTextLines = allText.split(/\r\n|\n/);
    var curRow = 0;
    for (var i = 0; i < allTextLines.length; i++) {
        var data = allTextLines[i].split('|');
        if (data[0] != "") {
            gCommentaryIndex[curRow] = data[0];
            gCommentaryDataLookup[data[0]] = curRow;
            gCommentaryData.push(data);
            curRow ++;
        }
    }
}
function processPhotoData(allText) {
    //console.log("processPhotoData");
    var allTextLines = allText.split(/\r\n|\n/);
    var curRow = 0;
    for (var i = 0; i < allTextLines.length; i++) {
        if (allTextLines[i] != "") {
            var data = allTextLines[i].split('|');
            gPhotoData.push(data);
            gPhotoDataLookup[data[0]] = curRow;
            gPhotoIndex[i] = data[0];
            curRow++;
        }
    }
}
function processMissionStagesData(allText) {
    //console.log("processMissionStagesData");
    var allTextLines = allText.split(/\r\n|\n/);
    for (var i = 0; i < allTextLines.length; i++) {
        var data = allTextLines[i].split('|');
        if (data[0] != "") {
            gMissionStages.push(data);
        }
        if (i > 0) {
            gMissionStages[i - 1][3] = data[0]; //append this items start time as the last item's end time
        }
    }
    gMissionStages[gMissionStages.length - 1][3] = secondsToTimeStr(gMissionDurationSeconds); //insert last end time as end of mission
}
function processVideoSegmentData(allText) {
    //console.log("processVideoSegmentData");
    var allTextLines = allText.split(/\r\n|\n/);
    for (var i = 0; i < allTextLines.length; i++) {
        var data = allTextLines[i].split('|');
        if (data[0] != "") {
            gVideoSegments.push(data);
        }
    }
}