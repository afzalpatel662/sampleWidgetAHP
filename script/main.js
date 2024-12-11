require(["DS/DataDragAndDrop/DataDragAndDrop", "DS/PlatformAPI/PlatformAPI", "DS/WAFData/WAFData", "DS/i3DXCompassServices/i3DXCompassServices"], 
	function(DataDragAndDrop, PlatformAPI, WAFData, BaseUrl) {

		var comWidget = {
			widgetDataSelected: {},
	
			onLoad: function() { 
                console.log("widget loaded");
                //widget.body.innerHTML = "Hello Afzal"
                // Create a dropbox for drag-and-drop functionality
				var dropbox = widget.createElement('div', { 'class' : 'mydropclass', 'text' : '' });
				//var dropimage = widget.createElement('img', { 'src': 'https://krishnaprasadarisetty.github.io/SLK_Boss_ATT/BO_ATT/Images/dropImage.png', 'alt': 'Dropbox Image' });
				//dropbox.append(dropimage);
				var dropboxsep = widget.createElement('div', { 'class' : 'dropboxsep', 'text' : '--- or ---' });
				dropboxsep.style= "font-size: 12px; color: #d5e8f2; text-align: center";
				dropbox.append(dropboxsep);
				//var button = document.createElement('button', {'class':'dynamic-button'});

				//button.style = "padding: 10px 20px; font-size: 14px; text-align: center; margin: 10px; background-color: #368ec4; color: white; border: none; cursor: pointer";
				//button.innerHTML = 'Open content';
				//dropbox.append(button);
				dropbox.style = "border:2px #c6c5c5 dashed; margin:10px; padding: 5%; text-align: center";
				widget.body.innerHTML="";
				dropbox.inject(widget.body);

				var headersep = widget.createElement('div', { 'class' : 'headersep'});
				headersep.style= "font-size: 20px; color: #001100; text-align: center";
				headersep.innerHTML = "<p> 	My first widget </p>"
				var testsep = widget.createElement('div', { 'class' : 'testsep', 'text' : 'My first' });
				testsep.inject(widget.body);
				headersep.inject(widget.body);

				//
                var theInput = widget.body.querySelector('.mydropclass');
				DataDragAndDrop.droppable(theInput, {
					drop: function(input) {
                        alert(input);
						alert("test");
                        
                    }
                })
				/*
				console.log("hello afzal 8");
				comWidget.setBaseURL();
				setTimeout(() => {
					comWidget.setCSRF();
					comWidget.setSecurityContext();
				}, 1000);
				*/
            },
			setBaseURL: function() 
			{
				BaseUrl.getServiceUrl({ 
				serviceName: '3DSpace', 
				platformId:  widget.getValue('x3dPlatformId'),
				onComplete :  function (URLResult) {
					console.log("base url set");
					widget.setValue("urlBASE", URLResult+"/");
				},
				onFailure:  function( ) { alert("Something Went Wrong");
				}
				}); 
			},

			setCSRF: function() {
				// Web Service call to get the crsf token (security) for the current session
				let urlWAF = widget.getValue("urlBASE")+"resources/v1/application/CSRF";
				let dataWAF = {
				};
				let headerWAF = {
				};
				let methodWAF = "GET";
				let dataResp=WAFData.authenticatedRequest(urlWAF, {
					method: methodWAF,
					headers: headerWAF,
					data: dataWAF,
					type: "json",
					async : false,
					onComplete: function(dataResp) {
						// Save the CSRF token to a hidden widget property so it can be recalled
						console.log("csrf token set");
						let csrfArr=dataResp["csrf"];
						widget.setValue("csrfToken", csrfArr["value"]);
					},
					onFailure: function(error) {
						widget.body.innerHTML += "<p>Something Went Wrong- "+error+"</p>";
						widget.body.innerHTML += "<p>" + JSON.stringify(error) + "</p>";
					}
				});
			},

			setSecurityContext: function() {
				// Web Service call to get the security context for the login person
				let urlWAF = widget.getValue("urlBASE")+"/resources/modeler/pno/person/?current=true&select=preferredcredentials&select=collabspaces";
				let dataWAF = {
				};
				let headerWAF = {
				};
				let methodWAF = "GET";
				let dataResp=WAFData.authenticatedRequest(urlWAF, {
					method: methodWAF,
					headers: headerWAF,
					data: dataWAF,
					type: "json",
					async : false,
					onComplete: function(dataResp) {
						console.log("security context is---"+dataResp);
						comWidget.credentialDataParser(dataResp);
					},
					onFailure: function(error) {
						widget.body.innerHTML += "<p>Something Went Wrong- "+error+"</p>";
						widget.body.innerHTML += "<p>" + JSON.stringify(error) + "</p>";
					}
				});
			}
					
		};

		

		widget.addEvent('onLoad',comWidget.onLoad);
		widget.addEvent("onRefresh", comWidget.onLoad);
	});