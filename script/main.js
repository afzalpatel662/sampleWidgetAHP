require(["DS/DataDragAndDrop/DataDragAndDrop", "DS/PlatformAPI/PlatformAPI", "DS/WAFData/WAFData", "DS/i3DXCompassServices/i3DXCompassServices"], 
	function(DataDragAndDrop, PlatformAPI, WAFData, BaseUrl) {

		var comWidget = {
			widgetDataSelected: {},
	
			onLoad: function() { 
                console.log("widget loaded");
				widget.body.innerHTML = "Please fill the form to request creation of IP Classification folder:"
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

				// Parent Class Link Label
				const parentClassLinkLabel = document.createElement('label');
				parentClassLinkLabel.setAttribute('for', 'parentClassName');
				parentClassLinkLabel.innerText = 'Enter Link of parent IP Classification/Library folder under which you need to create new folder:';
				form.appendChild(parentClassLinkLabel);

				// Parent Class Link Input
				const parentClassLinkInput = document.createElement('input');
				parentClassLinkInput.type = 'text';
				parentClassLinkInput.id = 'parentClassID';
				parentClassLinkInput.name = 'parentClassID';
				parentClassLinkInput.required = true;
				parentClassLinkInput.style.width = '100%';
				parentClassLinkInput.style.padding = '8px';
				parentClassLinkInput.style.margin = '5px 0 15px';
				parentClassLinkInput.style.borderRadius = '4px';
				parentClassLinkInput.style.border = '1px solid #ccc';
				form.appendChild(parentClassLinkInput);

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
				widget.body.appendChild(formContainer);
				let sDefaultContext = "";

				// Add event listener for form submission
				form.addEventListener('submit', function(event) {
					event.preventDefault(); // Prevent default form submission

					const ipClassTitle = ipClassTitleInput.value;
					const ipClassDescription = ipClassDescriptionTextarea.value;
					const ipClassParentLink = parentClassLinkInput.value;

					// Display the input values in the console (or send them elsewhere)
					console.log("IP Class Title:", ipClassTitle);
					console.log("IP Class Description:", ipClassDescription);
					console.log("IP Class Link:", ipClassParentLink);

					//Get physical id of parent folder from link
					const decodedUrl = decodeURIComponent(ipClassParentLink);
					const startIndex = decodedUrl.indexOf("objectId") + 11;
					const endIndex = decodedUrl.indexOf("\"", startIndex);
					const parentPhysicalId = decodedUrl.substring(startIndex, endIndex);
					console.log("parentPhysicalId:", parentPhysicalId);
					
					const dataTitle = "IPClassCreation_" + parentPhysicalId + "_" + ipClassTitle + "_" + ipClassDescription;
					//adding task approver - to be added in config file later
					let taskApprover = "apatel55";
										
					let routejson = {
						"data": [
						  {
							"title": "Approval Route for IP Class creation",
							"description": "Approval Route for IP Class creation",
							"routeBasePurpose": "Approval",
							"AutoStopOnRejection": "Immediate",
							"routeCompletionAction": "Notify Route Owner",
							"tasks": [
							  {
								"allowDelegation": "TRUE",
								"assigneeSetDueDate": "Yes",
								"instructions": "Requesting your approval for IP Class creation",
								"taskAction": "Approve",
								"taskOrder": "1",
								"title": dataTitle,
								"taskAssigneeUsername": taskApprover
							  }
							]
						  }
						]
					  };
					
					//method to create route
						let bStatus = comWidget.createTask(routejson);
						let bRouteCreationStatus = JSON.stringify(bStatus.status);
					  	console.log("bStatus---"+bRouteCreationStatus);

					// Start route after creation
					if(bRouteCreationStatus)
					{
						const routePId = bStatus.data[0].id;
						console.log("route pid"+routePId);
						let bStartRoute = comWidget.startRoute(routePId);
					}
					// Optionally reset the form after submission
					form.reset();
				});

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
				console.log("e-(dataresp)--"+JSON.stringify(e));
				var t,i,n;
		
				this.optionsList=[],this.defaultCollabSpace=null;
		
				var o=e.preferredcredentials;
				console.log("o-(preferred creentials)--"+o);
		
				if(o.collabspace&&o.role&&o.organization){
					var r=o.collabspace,s=o.role,a=o.organization,t=r.name,i=s.name,n=a.name;
					console.log("r--(preferred creentials collab space)----"+JSON.stringify(r));
					console.log("s---(preferred creentials role)----"+JSON.stringify(s));
					console.log("a---(preferred creentials org)----"+JSON.stringify(a));
					this.defaultCollabSpace=i+"."+n+"."+t;
					console.log("this.defaultCollabSpace 1---"+this.defaultCollabSpace);
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
				const defaultValue = this.defaultCollabSpace;
				sDefaultContext = defaultValue;
				console.log("defaultValue---"+defaultValue);
				 widget.addPreference({
					name: "SecurityContext",
					type: "list",
					label: "SecurityContext",
					defaultValue: defaultValue,
					options:this.optionsList
				});
			},

			createTask: function(objJSON) 
			{
				let iSecurityContext = widget.getValue("SecurityContext");
				console.log("widget.getValue for SC---"+iSecurityContext);
				console.log("sDefaultContext---"+sDefaultContext);
				if(iSecurityContext=="" || iSecurityContext==null)
				{
					console.log("Default value was empty");
					iSecurityContext=sDefaultContext;
				}



				var headerWAF = {
					"ENO_CSRF_TOKEN" : widget.getValue("csrfToken"),
					"SecurityContext" : iSecurityContext,
					"Accept-Language": "application/json",
					"Content-Type" : "application/json"
				};
				console.log("headerWAF---"+JSON.stringify(headerWAF));
				var methodWAF = "POST";
				var urlObjWAF;
				urlObjWAF = widget.getValue("urlBASE")+"resources/v1/modeler/dsrt/routes";
				console.log("urlObjWAF--"+urlObjWAF);
				let dataRespTask = {};
				let dataResp=WAFData.authenticatedRequest(urlObjWAF, {
					method: methodWAF,
					headers: headerWAF,
					data: JSON.stringify(objJSON),
					//data: objJSON,
					type: "json",
					async : false,
					onComplete: function(dataResp) {
						dataRespTask=dataResp;
						dataRespTask.status = true;
						console.log("Created Route"+JSON.stringify(dataRespTask));
						const routePId = dataRespTask.data[0].id;
						console.log("route pid"+routePId);
								
					},
					onFailure: function(error, backendresponse, response_hdrs) {
						if(iSecurityContext=="" || iSecurityContext==null)
						{
							alert("Please select and save proper credentials in perferences tab");
						}
						else
						{
							alert("Something went wrong during form submission");
						}						
						console.log(backendresponse);
						console.log(response_hdrs);
						//widget.body.innerHTML += "<p>Something Went Wrong during task creation from AHP widget"+error+"</p>";
					}
				})
				return dataRespTask;
			},

			startRoute: function(routePID) 
			{
				let iSecurityContext = widget.getValue("SecurityContext");
				if(iSecurityContext=="" || iSecurityContext==null)
				{
					iSecurityContext=sDefaultContext;
				}

				var headerWAF = {
					"ENO_CSRF_TOKEN" : widget.getValue("csrfToken"),
					//ENO_CSRF_TOKEN: "",
					"SecurityContext" : iSecurityContext,
					"Accept-Language": "application/json",
					"Content-Type" : "application/json"
				};
				var methodWAF = "POST";
				var urlObjWAF;
				urlObjWAF = widget.getValue("urlBASE") +"/resources/v1/modeler/dsrt/routes/" + routePID + "/start";
				console.log("urlObjWAF--"+urlObjWAF);
				let dataRespRouteStart = {};
				let dataResp=WAFData.authenticatedRequest(urlObjWAF, {
					method: methodWAF,
					headers: headerWAF,
					data: "",
					type: "json",
					async : false,
					onComplete: function(dataResp) {
						dataRespRouteStart=dataResp;
						dataRespRouteStart.status = true;
						console.log("Route Started"+JSON.stringify(dataRespRouteStart));								
					},
					onFailure: function(error, backendresponse, response_hdrs) {
						alert(backendresponse.message);
						widget.body.innerHTML += "<p>Something Went Wrong during starting route"+error+"</p>";
					}
				})
				return dataRespRouteStart;
			}
					
		};

		

		widget.addEvent('onLoad',comWidget.onLoad);
		widget.addEvent("onRefresh", comWidget.onLoad);
	});