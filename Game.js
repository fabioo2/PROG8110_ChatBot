const GameState = Object.freeze({
  WELCOMING: Symbol('welcoming'),
  BEGIN: Symbol('begin'),
  EMERGENCY: Symbol('emergency'),
  RISK: Symbol('risk'),
  CONTACT1: Symbol('contact1'),
  CONTACT2: Symbol('contact2'),
  TRAVEL: Symbol('travel'),
  FINAL: Symbol('final'),
  QUIT: Symbol('quit'),
});

module.exports = class Game {
  constructor() {
    this.stateCur = GameState.WELCOMING;
  }

  makeAMove(sInput) {
    let aReply = [];
    switch (this.stateCur) {
      case GameState.WELCOMING:
        aReply.push(
          "Take this self-assessment if you're worried you were exposed to COVID-19 (novel coronavirus) or have symptoms"
        );
        aReply.push('You will get a recommendation on what to do next.');
        aReply.push('You can also take it on behalf of someone else');
        aReply.push('type BEGIN to start the assessment');
        aReply.push('You may type QUIT at any time to exit the assessment');
        this.stateCur = GameState.BEGIN;
        return aReply;
      case GameState.BEGIN:
        if (sInput.toLowerCase().match('begin')) {
          aReply.push('Are you currently experiencing any of these issues?');
          aReply.push('· Severe difficulty breathing');
          aReply.push('· Severe chest pain');
          aReply.push('· Feeling confused or unsure of where you are');
          this.stateCur = GameState.EMERGENCY;
          return aReply;
        } else if (sInput.toLowerCase().match('quit')) {
          aReply.push('Thank you');
          this.stateCur = GameState.WELCOMING;
          return aReply;
        } else {
          aReply.push('Invalid input');
          this.stateCur = GameState.BEGIN;
          return aReply;
        }
      case GameState.EMERGENCY:
        if (sInput.toLowerCase().match('yes')) {
          aReply.push(
            'Call 911 or go directly to your nearest emergency department.'
          );
          this.stateCur = GameState.WELCOMING;
          return aReply;
        } else if (sInput.toLowerCase().match('no')) {
          aReply.push('Are you currently experiencing any of these symptoms?');
          aReply.push(
            "· Fever \n · Chills \n · Cough that's new or worsening \n · Shortness of breath \n · Sore throat \n · Difficulty swallowing \n · Runny nose \n · Stuffy or congested nose \n · Lost sense of taste or smell \n · Pink eye \n · Unusual/long lasting headache \n · Digestive issues \n · Muscle aches \n · Extreme abnormal tiredness \n · Falling down often"
          );
          this.stateCur = GameState.RISK;
          return aReply;
        } else if (sInput.toLowerCase().match('quit')) {
          aReply.push('Thank you');
          this.stateCur = GameState.WELCOMING;
          return aReply;
        } else {
          aReply.push('Invalid input');
          this.stateCur = GameState.EMERGENCY;
          return aReply;
        }
      case GameState.RISK:
        if (sInput.toLowerCase().match('yes')) {
          aReply.push(
            'Based on your answers, we recommend that you go to a COVID-19 Assessment Centre to get tested because you have some symptoms'
          );
          this.stateCur = GameState.WELCOMING;
          return aReply;
        } else if (sInput.toLowerCase().match('no')) {
          aReply.push('Are you in any of these at-risk groups?');
          aReply.push('· 70 years or older');
          aReply.push(
            '· Getting treatment that compromises (weakens) your immune system (e.g. chemotherapy, corticosteroids'
          );
          aReply.push(
            '· Having a condition that compromises (weakens) your immune system (e.g. lupus, rheumatoid arthritis)'
          );
          aReply.push(
            '· Having a chronic (long-lasting) health condition (e.g. emphysema, asthma, heart condition)'
          );
          aReply.push(
            '· Regularly going to the hospital or health care setting for a treatment (e.g. dialysis, surgery, cancer treatment)'
          );
          this.stateCur = GameState.CONTACT1;
          return aReply;
        } else if (sInput.toLowerCase().match('quit')) {
          aReply.push('Thank you');
          this.stateCur = GameState.WELCOMING;
          return aReply;
        } else {
          aReply.push('Invalid input');
          this.stateCur = GameState.RISK;
          return aReply;
        }
      case GameState.CONTACT1:
        if (sInput.toLowerCase().match('yes')) {
          aReply.push(
            'Based on your answers, we recommend that you stay at home and monitor your health because you are part of an at-risk group.'
          );
          this.stateCur = GameState.WELCOMING;
          return aReply;
        } else if (sInput.toLowerCase().match('no')) {
          aReply.push(
            'In the last 14 days, have you been in close physical contact with someone who tested positive for COVID-19?'
          );
          aReply.push('Close Contact means:');
          aReply.push(
            '· Being less than 2 metres away in the same room, workplace, or area for ever 15 minutes'
          );
          aReply.push('· Living in the same house');
          this.stateCur = GameState.CONTACT2;
          return aReply;
        } else if (sInput.toLowerCase().match('quit')) {
          aReply.push('Thank you');
          this.stateCur = GameState.WELCOMING;
          return aReply;
        } else {
          aReply.push('Invalid input');
          this.stateCur = GameState.CONTACT;
          return aReply;
        }
      case GameState.CONTACT2:
        if (sInput.toLowerCase().match('yes')) {
          aReply.push(
            'Based on your answers, we recommend that you go to a COVID-19 assessment centre to get tested because you were in close physical contact with someone who has COVID-19 symptoms or recently travelled'
          );
          this.stateCur = GameState.WELCOMING;
          return aReply;
        } else if (sInput.toLowerCase().match('no')) {
          aReply.push(
            'In the last 14 days, have you been in close physical contact with someone who either: '
          );
          aReply.push(
            '· Is currently sick with a new cough, fever, or difficulty breathing?'
          );
          aReply.push('· Returned from outside of Canada in the last 2 weeks?');
          this.stateCur = GameState.TRAVEL;
          return aReply;
        } else if (sInput.toLowerCase().match('quit')) {
          aReply.push('Thank you');
          this.stateCur = GameState.WELCOMING;
          return aReply;
        } else {
          aReply.push('Invalid input');
          this.stateCur = GameState.CONTACT;
          return aReply;
        }
      case GameState.TRAVEL:
        if (sInput.toLowerCase().match('yes')) {
          aReply.push(
            'Based on your answers, we recommend that you go to a COVID-19 assessment centre to get tested because you were in close physical contact with someone who has COVID-19 symptoms or recently travelled'
          );
          this.stateCur = GameState.WELCOMING;
        } else if (sInput.toLowerCase().match('no')) {
          aReply.push(
            'Have you travelled outside of Canada in the last 14 days?'
          );
          this.stateCur = GameState.FINAL;
          return aReply;
        } else if (sInput.toLowerCase().match('quit')) {
          aReply.push('Thank you');
          this.stateCur = GameState.WELCOMING;
          return aReply;
        } else {
          aReply.push('Invalid input');
          this.stateCur = GameState.CONTACT;
          return aReply;
        }
      case GameState.FINAL:
        if (sInput.toLowerCase().match('yes')) {
          aReply.push(
            'You must stay at home for 14 days immediately after your return to Canada.'
          );
          this.stateCur = GameState.WELCOMING;
          return aReply;
        } else if (sInput.toLowerCase().match('no')) {
          aReply.push(
            'Based on your answers, you do not seem to have symptoms or be part of an at-risk group. We recommend that you be cautious when outside and keep a distance from others as much as possible.'
          );
          aReply.push(
            'Keep a distance of at least 6 feet (2 metres) from people you do not live with to slow the spread of the virus'
          );
          aReply.push(
            'The best way to stop the spread is by staying home as much as you can and washing your hands.'
          );
          this.stateCur = GameState.WELCOMING;
          return aReply;
        } else if (sInput.toLowerCase().match('quit')) {
          aReply.push('Thank you');
          this.stateCur = GameState.WELCOMING;
          return aReply;
        } else {
          aReply.push('Invalid input');
          this.stateCur = GameState.CONTACT;
          return aReply;
        }
    }
  }
};
