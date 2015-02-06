//
//
// main entry
//
//
function highlight(sQuery, sResultMatch)
{
  var q = sQuery + " ";
  var r = sResultMatch + " ";
  //
  // calculate the bitmap
  //
  var bitmap = new Array(r.length);
  for (var i = 0; i < bitmap.length; i++) {
    bitmap[i] = 0;
  }
  //
  var qTokens = new Array();
  var qPositions = new Array();
  var rTokens = new Array();
  var rPositions = new Array();
  tokenize(q, qTokens, qPositions);
  tokenize(r, rTokens, rPositions);
  //
  for (var i = 0; i < qTokens.length; i++) {
    var qTok = qTokens[i];
    var matched = false;
    for (var j = 0; j < rTokens.length; j++) {
      var rTok = rTokens[j];
      var rPos = rPositions[j];
      var rPrefix = rTok.substr(0, qTok.length);
      if (qTok.toLowerCase() == rPrefix.toLowerCase()) {
        var lb = rPos;
        var rb = rPos + qTok.length - 1;
        for (var k = lb; k <= rb; k++) {
          bitmap[k]++;
        }
        break;
      }
    }
  }
  //
  // generate markup string
  //
  var markup = "";
  var enclosed = true;
  var i = 0;
  for (var j = 0; j < r.length; j++) {
    if (enclosed) {
      if (bitmap[j] > 0) {
        enclosed = false;
        i = j;
      }
    } else {
      if (bitmap[j] == 0) {
        enclosed = true;
        var str = r.substr(i, j - i);
        //markup += "<font color='red'><b>" + str + "</b></font>";
        markup += "<b>" + str + "</b>";
      }
    }
    if (bitmap[j] == 0 && j < r.length - 1) {
      markup += r.charAt(j);
    }
  }
  //
  return markup;
}
//
//
// supporting functions
//
//
function tokenize(s, tokens, positions)
{
  var i = 0;
  var enclosed = true;
  for (var j = 0; j < s.length; j++) {
    var charCode = s.charCodeAt(j);
    if (enclosed) {
      if (isWordCharacter(charCode)) {
        enclosed = false;
        i = j;
      }
    } else {
      if (!isWordCharacter(charCode)) {
        enclosed = true;
        var tok = s.substr(i, j - i);
        var pos = i;
        tokens.push(tok);
        positions.push(pos);
      }
    }
  }
}
//
function isWordCharacter(charCode)
{
  return charCode < 0 || charCode > 255 || charCode == 45 ||
         (charCode >= 48 && charCode <= 57)  ||
         (charCode >= 97 && charCode <= 122) ||
         (charCode >= 65 && charCode <= 90);
}
//
// easter egg
//
function yaxi()
{
  //alert('什么亚克西~\n什么亚克西~呀~\n党中央的政策~亚~克~西~！');
  window.location = "/";
}
