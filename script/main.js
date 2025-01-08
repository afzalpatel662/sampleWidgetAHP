require(["DS/DataDragAndDrop/DataDragAndDrop", "DS/PlatformAPI/PlatformAPI", "DS/WAFData/WAFData", "DS/i3DXCompassServices/i3DXCompassServices"], 
	function(DataDragAndDrop, PlatformAPI, WAFData, BaseUrl) {

		var comWidget = {
			widgetDataSelected: {},
	
			onLoad: function() { 
                console.log("widget loaded");
				/*
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
				formText.innerHTML = "Enter Title";

				
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
				btnSubmit.inject(widget.body);
				//
                var theInput = widget.body.querySelector('.mydropclass');
				DataDragAndDrop.droppable(theInput, {
					drop: function(input) {
                        alert(input);
						alert("test");
                        
                    }
                })
				*/
				widget.body.innerHTML = "Sample widget to create Task 6"
				// Create form container
				const formContainer = document.createElement('div');
				formContainer.style.maxWidth = '400px';
				formContainer.style.margin = 'auto';
				formContainer.style.padding = '20px';
				formContainer.style.border = '1px solid #ccc';
				formContainer.style.borderRadius = '8px';
				formContainer.style.boxShadow = '0 0 10px rgba(0, 0, 0, 0.1)';

				// Create form
				const form = document.createElement('form');
				form.id = 'taskForm';

				// IP Class Title Label
				const ipClassTitleLabel = document.createElement('label');
				ipClassTitleLabel.setAttribute('for', 'ipClassTitle');
				ipClassTitleLabel.innerText = 'Enter Title for IP Class';
				form.appendChild(ipClassTitleLabel);

				// IP Class Title Input
				const ipClassTitleInput = document.createElement('input');
				ipClassTitleInput.type = 'text';
				ipClassTitleInput.id = 'ipClassTitle';
				ipClassTitleInput.name = 'ipClassTitle';
				ipClassTitleInput.required = true;
				ipClassTitleInput.style.width = '100%';
				ipClassTitleInput.style.padding = '8px';
				ipClassTitleInput.style.margin = '5px 0 15px';
				ipClassTitleInput.style.borderRadius = '4px';
				ipClassTitleInput.style.border = '1px solid #ccc';
				form.appendChild(ipClassTitleInput);

				// IP Class Description Label
				const ipClassDescriptionLabel = document.createElement('label');
				ipClassDescriptionLabel.setAttribute('for', 'ipClassDescription');
				ipClassDescriptionLabel.innerText = 'Enter Description for IP Class';
				form.appendChild(ipClassDescriptionLabel);

				// IP Class Description Textarea
				const ipClassDescriptionTextarea = document.createElement('textarea');
				ipClassDescriptionTextarea.id = 'ipClassDescription';
				ipClassDescriptionTextarea.name = 'ipClassDescription';
				ipClassDescriptionTextarea.rows = 4;
				ipClassDescriptionTextarea.required = true;
				ipClassDescriptionTextarea.style.width = '100%';
				ipClassDescriptionTextarea.style.padding = '8px';
				ipClassDescriptionTextarea.style.margin = '5px 0 15px';
				ipClassDescriptionTextarea.style.borderRadius = '4px';
				ipClassDescriptionTextarea.style.border = '1px solid #ccc';
				form.appendChild(ipClassDescriptionTextarea);

				// Parent Class Label
				const parentClassNameLabel = document.createElement('label');
				parentClassNameLabel.setAttribute('for', 'parentClassName');
				parentClassNameLabel.innerText = 'Enter parent IP Class/Library Name:';
				form.appendChild(parentClassNameLabel);

				// Parent Class Input
				const parentClassNameInput = document.createElement('input');
				parentClassNameInput.type = 'text';
				parentClassNameInput.id = 'parentClassName';
				parentClassNameInput.name = 'parentClassName';
				parentClassNameInput.required = true;
				parentClassNameInput.style.width = '100%';
				parentClassNameInput.style.padding = '8px';
				parentClassNameInput.style.margin = '5px 0 15px';
				parentClassNameInput.style.borderRadius = '4px';
				parentClassNameInput.style.border = '1px solid #ccc';
				form.appendChild(parentClassNameInput);

				// Submit Button
				const submitButton = document.createElement('button');
				submitButton.type = 'submit';
				submitButton.innerText = 'Submit';
				submitButton.style.padding = '10px 15px';
				submitButton.style.backgroundColor = '#4CAF50';
				submitButton.style.color = 'white';
				submitButton.style.border = 'none';
				submitButton.style.borderRadius = '4px';
				submitButton.style.cursor = 'pointer';
				form.appendChild(submitButton);

				// Append form to container
				formContainer.appendChild(form);

				// Append the form container to the body of the document
				//document.body.appendChild(formContainer);
				//formContainer.inject(widget.body);
				widget.body.appendChild(formContainer);

				// Add event listener for form submission
				form.addEventListener('submit', function(event) {
					event.preventDefault(); // Prevent default form submission

					const ipClassTitle = ipClassTitleInput.value;
					const ipClassDescription = ipClassDescriptionTextarea.value;

					// Display the input values in the console (or send them elsewhere)
					console.log("Task Title:", ipClassTitle);
					console.log("Task Description:", ipClassDescription);

					let datajson = {"dataelements": {
                			"title":"TEST_Widget_task",
                			"state": "Assign",
							"description": "created from AHP widget"
							}
						};
					
					let routejson = {
						"data": [
						  {
							"title": "AHP Created from Postman",
							"description": "engineering approval route "
							
						  }
						]
					  };

						//console.log("datajson:: "+JSON.stringify(datajson));
						//let bStatus = comWidget.createTask(datajson);
						let bStatus = comWidget.createTask(routejson);





					// Optionally reset the form after submission
					form.reset();
				});



				console.log("hello afzal test 22");
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
			},

			createTask: function(objJSON) 
			{
				var headerWAF = {
					ENO_CSRF_TOKEN: widget.getValue("csrfToken"),
					//ENO_CSRF_TOKEN: "",
					SecurityContext: widget.getValue("SecurityContext"),
					"Accept-Language": "application/json"
				};

				console.log(headerWAF);
				var methodWAF = "POST";
				var urlObjWAF;
				//urlObjWAF = widget.getValue("urlBASE")+"resources/v1/modeler/tasks";
				urlObjWAF = widget.getValue("urlBASE")+"resources/v1/modeler/dsrt/routes";
				
				let dataRespTask = {};
				let dataResp=WAFData.proxifiedRequest(urlObjWAF, {
					method: methodWAF,
					headers: headerWAF,
					data: JSON.stringify(objJSON),
					//data: objJSON,
					type: "json",
					async : false,
					onComplete: function(dataResp) {
						dataRespTask=dataResp;
						dataRespTask.status = true;
						dataRespTask.output = dataResp;
						console.log("task creation AHP widget",dataRespTask);
								
					},
					onFailure: function(error, backendresponse, response_hdrs) {
						alert(backendresponse.message);
						//console.log(backendresponse);
						//console.log(response_hdrs);
						widget.body.innerHTML += "<p>Something Went Wrong during task creation from AHP widget"+error+"</p>";
					}
				})
				return dataRespTask;
			}
					
		};

		

		widget.addEvent('onLoad',comWidget.onLoad);
		widget.addEvent("onRefresh", comWidget.onLoad);
	});