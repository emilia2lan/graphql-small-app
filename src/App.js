import { gql, useQuery } from '@apollo/client';
import React from 'react';

const profileQuery = gql`
  query($first: Int!) {
    viewer {
      login
      avatarUrl
      company

      repositories(first: $first) {
        nodes {
          name
          id
          createdAt
          defaultBranchRef {
            name
          }
        }
      }
    }
  }
`;
function App() {
  const first = parseInt(window.location.search.replace('?first=', ''));
  const { loading, error, data } = useQuery(profileQuery, {
    variables: { first ?? 5 },
  });
  if (loading) return 'Loading...';
  if (error) return 'ups, something went wrong!';

  return (
    <div className="App">
      <img src={data.viewer.avatarUrl} height="200" alt="Profile" />
      <p>{data.viewer.company}</p>
      <ul>
        {data.viewer.repositories.nodes.map((repo) => {
          return <li key={repo.id}>{repo.name}</li>;
        })}
      </ul>
    </div>
  );
}

export default App;
