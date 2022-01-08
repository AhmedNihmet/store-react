import superagent from 'superagent';
import superagentAbsolute from 'superagent-absolute';

export default function getAgentInstance() {
  let agent = superagent.agent();

  agent = agent.type('json');
  agent = agent.set('Content-Type', 'application/json');


  const storedData = localStorage.getItem('store-user');
  if (storedData) {
    const userObj = JSON.parse(storedData)
    const token = userObj.token
    agent = agent.set('Authorization', `Bearer ${token}`);
  }

  const request = superagentAbsolute(agent)(
    `${process.env.REACT_APP_API_LINK}`
  );
  return request;
}
