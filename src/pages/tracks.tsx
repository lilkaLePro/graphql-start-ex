import { Layout } from "../components";
import { gql } from "../__generated__/";
import { useQuery } from "@apollo/client";
import TrackCard from "../containers/track-card";
import QueryResult from "../components/query-result";

const GET_TRACKS = gql(`
  query GETTRACKS {
    tracksForHome {
    id
    title
    thumbnail
    length
    modulesCount
    description
    numberOfViews
    author {
      id
      name
      photo
    }
    modules {
      content
      id
      length
      title
      videoUrl
    }
  }
  }
  `);

  
  
  const Track = () => {
    const { data, loading, error } = useQuery(GET_TRACKS);
    { loading && <div>Loading...</div> }
    { error && <div> `Error! ${error.message}` </div> }
  
    return (
      <QueryResult loading={loading} error={error} data={data} >
        <Layout grid>
          {
            data?.tracksForHome?.map((track) => (
              <TrackCard key={track.id} track={track} />
            ))
          }
        </Layout>;
      </QueryResult>
    )
};
export default Track;
