window.addEventListener('load', function() {
	//stran nalozena
	
	var prizgiCakanje = function() {
		document.querySelector(".loading").style.display = "block";
	}
	
	var ugasniCakanje = function() {
		document.querySelector(".loading").style.display = "none";
	}

	document.querySelector("#nalozi").addEventListener("click", prizgiCakanje);
	
	//Pridobi seznam datotek
	var pridobiSeznamDatotek = function(event) {
		prizgiCakanje();
		var xhttp = new XMLHttpRequest();
		xhttp.onreadystatechange = function() {
			if (xhttp.readyState == 4 && xhttp.status == 200) {
				var datoteke = JSON.parse(xhttp.responseText);
				
				var datotekeHTML = document.querySelector("#datoteke");
				
				for (var i=0; i<datoteke.length; i++) {
					var datoteka = datoteke[i];
					// bit logika
					var velikost = datoteka.velikost;
					var enota = "";
					if(velikost < 1024)
						enota="B";
					else if(velikost > 1024 && velikost <1048576 ){
						velikost = Math.floor(velikost/1024);
						enota="KB";
					}
					else{
						velikost = Math.floor(velikost/1048576);
						enota="MB";
					}
					//dodajanje gumba
					datotekeHTML.innerHTML += " \
						<div class='datoteka senca rob'> \
							<div class='naziv_datoteke'> " + datoteka.datoteka + "  (" + velikost + " " + enota + ") </div> \
							<div class='akcije'> \
							| <span><a href='/prenesi/" + datoteka.datoteka + "' target='_self'>Prenesi</a></span> \
							| <span akcija='brisi' datoteka='"+ datoteka.datoteka +"'>Izbriši</span> \
							| <span><a href='/poglej/" + datoteka.datoteka + "' target='_self'>Poglej</a></span></div> \
					    </div>";	
				}
				
				if (datoteke.length > 0) {
					var el = document.querySelectorAll("span[akcija=brisi]");
					for(var i = 0; i < el.length; i++){
						el[i].addEventListener("click", brisi);
					}
				}
				ugasniCakanje();
			}
		};
		//sem dodal GET request
		xhttp.open("GET", "/datoteke", true);
		xhttp.send();
	}
	//poklicemo funkcijo
	pridobiSeznamDatotek();
	var brisi = function(event) {
		prizgiCakanje();
		var xhttp = new XMLHttpRequest();
		xhttp.onreadystatechange = function() {
			if (xhttp.readyState == 4 && xhttp.status == 200) {
				if (xhttp.responseText == "Datoteka izbrisana") {
					window.location = "/";
				} else {
					alert("Datoteke ni bilo možno izbrisati!");
				}
			}
			ugasniCakanje();
		};
		xhttp.open("GET", "/brisi/"+this.getAttribute("datoteka"), true);
		xhttp.send();
	}

});
document.ready