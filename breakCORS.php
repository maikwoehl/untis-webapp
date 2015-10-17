<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: text/plain");

/* gets the data from a URL */
function get_data($url) {
	$ch = curl_init();
	$timeout = 5;
	curl_setopt($ch, CURLOPT_URL, $url);
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
	curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, $timeout);
	$data = curl_exec($ch);
	curl_close($ch);
	return $data;
}

//$content = get_data("http://www.bbs-lingen-gf.de/homepage/vertretungsplan/schueler/Vertretungen-Klassen/frames/navbar.htm");
$content = file_get_contents("http://www.bbs-lingen-gf.de/homepage/vertretungsplan/schueler/Vertretungen-Klassen/frames/navbar.htm");

echo utf8_encode($content);
?>