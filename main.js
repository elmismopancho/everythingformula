var ctx = null;
var k = 0;

var binaryArray = null;
var binary = null;

function pixel(x, y, color) {
	if (ctx == null)
		return;

	var w = 5;
	var h = 5;
	var idx = x * w;
	var jdx = (16 - y) * h;

	ctx.fillStyle = color;
	ctx.fillRect(idx, jdx, w, h);
}

function toBinary() {
	binaryArray = new Array();
	k = k.div(17);
	while (k.gt(0)) {
		var remainder = k.mod(2);
		binaryArray.push(remainder.toString());
		k = k.div(2).round(0,0);
	}
	setTimeout(function() {
		toBinary2();
	}, 100);
}

function toBinary2() {
	var differenceTo1802 = 1802 - binaryArray.length;
	if (differenceTo1802 > 0) {
		for (var i = 0; i < differenceTo1802; i++) {
			binaryArray.push("0");
		};
	}

	binary = new Array();
	for (var i = binaryArray.length - 1; i >= 0; i--) {
		binary.push( binaryArray[i] );
	}
	setTimeout(function() {
		toBinary3();
	}, 100);
}

function toBinary3() {	
	var x = 0;
	var y = 0;
	for (var i = 0; i < binary.length; i++) {
		if (binary[i] == "1") {
			pixel(x, y, "#000000");
		} else {
			pixel(x, y, "#FFFFFF");
		}
		y++;
		if (y > 16) {
			y = 0;
			x++;
		}
	};

	$("#btnPlot").removeAttr('disabled');
}

$(function () {
	var canvas = document.getElementById('canvas');
	if (canvas.getContext ){
		pIdx = 0;
		pJdx = 0;


		ctx = canvas.getContext('2d');

		$("#btnPlot").click(function(){
			$("#btnPlot").attr('disabled','disabled');
			k = new Big($("#kInput").val());
			setTimeout(function() {
				toBinary();
			}, 100);
		});
    }
});