function Student(name, group, codeNumber, email, type) {
  this.name = name;
  this.group = group;
  this.codeNumber = codeNumber;
  this.email = email;
  //____________________________
  this.isSelected = false;
  console.log(type);
  if(!type){
    this.type = { "name": 'normal', "class": 'banner', 'avatar': 'avatar-img' }
  }
  this.type = { "name": type, "class": 'banner', 'avatar':'avatar-img'}
  if(this.type.name == 'gold'){
    this.type = { "name": type, "class": 'banner-gold', 'avatar': 'avatar-gold-img' }
  }else if(this.type.name == 'low'){
    this.type = { "name": type, "class": 'banner-care', 'avatar': 'avatar-low-img' }
  }
  this.status = { 'name': 'Present', 'class':'fas fa-user-check'};
  this.participation = 0;
  this.badBehavior = 0;
  this.chat = 0;
  this.sleep = 0;
  this.tools = true;
  this.random = 0;
  this.note = 0;
  this.homeWork = "No H.W";

  this.getStatus = function() {
    return this.status;
  };

  this.getNote = function(){
    return this.note;
  }

  this.getSleep = function() {
    return this.sleep;
  }

  this.getChat = function(){
    return this.chat;
  }

  this.getType = function () {
    return this.type;
  };

  this.getBadBehavior = function () {
    return this.badBehavior;
  };

  this.getParticipation = function () {
    return this.participation;
  };

  this.getTools = function () {
    return tools;
  };




  this.setIsSelected = function(){
    this.isSelected = !this.isSelected;
  }

  this.setStatus = function(status) {
    this.status = status;
    // if (this.status == "Present") {
    //   this.status = "Late";
    // } else if (this.status == "Late") {
    //   this.status = "Mission";
    // } else if (this.status == "Mission") {
    //   this.status = "Absent";
    // } else if (this.status == "Absent") {
    //   this.status = "Present";
    // }
  };

  this.setType = function(type) {
    this.type = type;
  }

  this.setChat = function(){
    this.chat++;
  }

  this.setSleep = function(){
    this.sleep++;
  }

  this.setBadBehavior = function() {
    this.badBehavior++;
  };

  this.setRandom = function() {
    this.random++;
  };

  this.setRandomSub = function() {
    this.random--;
  };

  this.setHomeWork = function() {
    if (this.homeWork == "No H.W") {
      this.homeWork = "Done";
    } else if (this.homeWork == "Done") {
      this.homeWork = "Not Done";
    } else if (this.homeWork == "Not Done") {
      this.homeWork = "No H.W";
    }
  };

  this.setNote = function(){
    this.note++;
  }

  this.setParticipation = function() {
    this.participation++;
  };

  this.setTools = function() {
    this.tools = !this.tools;
    // if (this.tools) {
    //   this.tools = false;
    // } else {
    //   this.tools = true;
    // }
  };
}
