import superagent from 'superagent';
import superagentAbsolute from 'superagent-absolute';

export default function getAgentInstance() {
  let agent = superagent.agent();
  // agent.on('error', (err) => {
  //   notificationHandler(err);
  // });

  agent = agent.set('Content-Type', 'application/json');
  agent = agent.type('json');

  const request = superagentAbsolute(agent)(
    `${process.env.REACT_APP_API_LINK}`
  );
  return request;
}
