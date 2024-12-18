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
				headersep.innerHTML = "<p> 	My first widget 6 </p>"
				var testsep = widget.createElement('div', { 'class' : 'testsep', 'text' : 'My first' });
				testsep.inject(widget.body);
				headersep.inject(widget.body);

				var formText = widget.createElement('div', { 'class' : 'form'});
				formText.style= "font-size: 10px; color: #001100; text-align: left";
				formText.innerHTML = "<p> 	Enter Title </p>";

				
				var txtTitle = widget.createElement('input');
				txtTitle.type="text";
				txtTitle.value="Title";
				txtTitle.id="title";
				

				formText.append(txtTitle);
				formText.inject(widget.body);

				var btnSubmit = widget.createElement('input');
					btnSubmit.type="button";
					btnSubmit.value = 'Create Task';
					btnSubmit.id="submit";
					btnSubmit.addEventListener('click', function (){				
						//let bStatus = comWidget.createCI(datajson);
						alert("Button clicked");
						
					});

				//
                var theInput = widget.body.querySelector('.mydropclass');
				DataDragAndDrop.droppable(theInput, {
					drop: function(input) {
                        alert(input);
						alert("test");
                        
                    }
                })
				
				console.log("hello afzal 8");
				comWidget.setBaseURL();
				setTimeout(() => {
					comWidget.setCSRF();
					comWidget.setSecurityContext();
				}, 1000);
				
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
			},

			credentialDataParser:function(e){
				var t,i,n;
		
				this.optionsList=[],this.defaultCollabSpace=null;
		
				var o=e.preferredcredentials;
		
				if(o.collabspace&&o.role&&o.organization){
					var r=o.collabspace,s=o.role,a=o.organization,t=r.name,i=s.name,n=a.name;
					this.defaultCollabSpace=i+"."+n+"."+t;
				}
				var l=e.collabspaces;
				if(l&&l.length>0){
					for(var c=!1,d=void 0,u=0;u<l.length;u++){
						for(var p=(f=l[u]).couples||[],g=0;g<p.length;g++){
							var m=p[g];
							if(void 0===d&&(d=m.organization.name),d!==m.organization.name){
								c=!0;
								break
							}
						}
						if(c)
						break
					}
					for(u=0;u<l.length;u++){
						var f,h=(f=l[u]).name,v=f.title;
						for(p=f.couples,g=0;g<p.length;g++){
							var C=p[g],b=C.organization,y=C.role,_=b.name,S=b.title,D=y.name,w=y.nls;
							var I=D+"."+_+"."+h;
							var A=c?v+" ● "+S+" ● "+w:v+" ● "+w;	
							this.optionsList.push({label:A,value:I})
						}
					}
				}
				 
				 widget.addPreference({
					name: "SecurityContext",
					type: "list",
					label: "SecurityContext",
					defaultValue: this.defaultCollabSpace,
					options:this.optionsList
				});
			}
					
		};

		

		widget.addEvent('onLoad',comWidget.onLoad);
		widget.addEvent("onRefresh", comWidget.onLoad);
	});