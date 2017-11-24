function Quote(quote,author)
{
	this.quote = quote;
	this.author = author;
	this.getHtml = function()
	{
		return "<span class=\"quotePhrase\">&ldquo;" + this.quote + "&rdquo;</span><br /><span class=\"quoteAuthor\">&ndash; " + this.author + "</span>";
	}
}

var quotes =
[
	new Quote ("The value of life can be measured by how many times your soul has been deeply stirred.", "Soichiro Honda"),
	new Quote ("The Honda NSX-R, I believe, is the purest, sharpest, best sounding driving experience and closest a road car has ever come to an F1 racer...","Ayrton Senna, 1992"),
	new Quote ("Racing improves the breed.","Soichiro Honda"),
	new Quote ("Without racing, there is no Honda.","Soichiro Honda"),
	new Quote ("Honda is racing.", "Hirotoshi Honda, President of Mugen"),
	new Quote ("The highest and best use of aluminum for civilian purposes.", "Car &amp; Driver, 1994"),
	new Quote ("Das Beste Oder Nichts", "signature of NSX Prime's len3.8"),
	new Quote ("I've failed 99% of my trials, in order to succeed in the remaining 1%.", "Soichiro Honda"),
	new Quote ("Simplify and add lightness.", "Colin Chapman"),
	new Quote ("That's 30 minutes away.  I'll be there in 10.", "Winston &quot;The Wolf&quot; Wolfe"),
//	new Quote ("A kite flies on a string, not a stick.", "-? (but I like this one)"),
	new Quote ("Action without Philosophy is a lethal weapon; Philosophy without action is worthless.", "Soichiro Honda"),
	new Quote ("When the Emperor asked about innovation, &quot;It is like falling in love. If you think it's distressing, it is unbearably distressing. If you think it is joyful, it is of supreme joy.&quot;", "Soichiro Honda"),
	new Quote ("To engineers of a new concept car, &quot;develop a car like motorbikes...a car, where drivers sense direct feelings of running, turning and stopping by the body.&quot;", "Soichiro Honda"),
//	new Quote ("If you like something, buy it.  Not because you want to think it's better than what you had... this will become an endless pursuit that will get you nowhere.", "advice NSX Prime's BlueKnight, paraphrased"),
	new Quote ("Honda has been choosing the hardest way, pursuing original technologies. I believe technologies borrowed from others will never become our flesh and blood.", "Soichiro Honda"),
	new Quote ("I want Honda to give off the smell of dangerâ€”danger that says you simply don't know what we might do next.", "Takeo Fukui"),
	new Quote ("What a noise!  Forget the Ferrari 360 Modena.  The Honda NSX-R has a howl so hard edged it could chisel granite.  The fezza sounds effete by comparison.", "Autocar, November 2002")
];

function dumpIt()
{
	var myString = "type your string here";
	for ( var i=0;i<myString.length;i++)
		document.write ((myString.charCodeAt(i)-64+18) + ",")
}

function writeContactLink(s)
{
	var xaofd = [63,51,59,62,70,65,12,65,60,51,69,18,65,60,51,69,0,64,55,70];
	document.write ( "<a class=\"mail\" href=\"" );
	for (var i=0;i<xaofd.length;i++) document.write (String.fromCharCode(xaofd[i]+46));
	document.write ( "\">"+s+"</a>" );
}

function getLinkCount()
{
	var eles = document.getElementsByTagName("a");
	var linkCount = 0;
	for ( var i = 0; i < eles.length; i++ )
		if ( eles[i].href != "")
			linkCount++;
	return linkCount;
}


function RandomQuote(ele1,ele2)
{
	this.idx = Math.floor(Math.random()*quotes.length);
	this.ele1 = document.getElementById(ele1);
	this.ele2 = document.getElementById(ele2);
	this.move = function(dir)
	{
		this.idx += dir;
		if (this.idx<0) this.idx = quotes.length-1;
		if (this.idx>=quotes.length) this.idx = 0;
		this.show();
	}
	this.show = function()
	{
		var qu = quotes[this.idx];
		this.ele1.innerHTML = qu.quote;
		this.ele2.innerHTML = qu.author;
	}
	this.show();
}