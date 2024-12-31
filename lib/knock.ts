import { Knock } from "@knocklabs/node";
import { Grants } from "@knocklabs/node/dist/src/common/userTokens";

export const knock = new Knock(process.env.KNOCK_SECRET_API_KEY);

export async function signUserToken(
  userId: string,
  workspaceId: string,
  projects: string[]
): Promise<string> {
  const grants = [
    Knock.buildUserTokenGrant({ type: "tenant", id: workspaceId }, [
      Grants.SlackChannelsRead,
    ]),
  ];

  for (const projectId of projects) {
    grants.push(
      Knock.buildUserTokenGrant(
        { type: "object", id: projectId, collection: "projects" },
        [Grants.ChannelDataRead, Grants.ChannelDataWrite]
      )
    );
  }

  const userToken = await Knock.signUserToken(userId, { grants });

  return userToken;
}
