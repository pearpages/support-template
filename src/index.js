const to = 'johndoe@gmail.com';

magic = () => {
  const data = getData();
  const subject = getSubject(data);
  const body = getBody(data);
  sendEmail(subject, body);
};

function getData() {
  const form = document.querySelectorAll('[name]');
  const names = {}
  for(let element of form) {
    names[element.name]= element.name;
  }
  const keys = Object.keys(names);
  const data = {};
  keys.forEach(key => {
    data[key] = document.querySelector(`[name="${key}"]`).value;
  });
  return data;
}

function sendEmail(subject, body) {
  const href = makeHref(subject, body);
  const button = document.getElementById('sendMail');
  button.setAttribute('href', href);
  button.click();
}

function makeHref(subject, body) {
  return `mailto:${to}?subject=${subject}&body=${body}`
}

function getSubject(res) {

  const errorMessage = (res.errorMessage) ? res.errorMessage.substr(0, 80) : '';
  const issueType = res.issueType;
  const text = `Bug: ${issueType} ${errorMessage}`;

  return encodeURI(text);
}

function getBody(res) {
  let text = `
  Issue Type: ${res.issueType}
  User: ${res.userid} ${res.email}
  Country: ${res.country}
  Device: ${res.device}
  Browser: ${res.browser}

  Error Message: 
  ${res.errorMessage}

  Current Situation: 
  ${res.current}

  Expected Situation: 
  ${res.expected}

  Screenshot:
  [ATTACH SCREENSHOT HERE]
  `;
  return encodeURI(text);
}
