import { keyCloakApi } from "@/api-client/keycloak";
import { signIn, signOut, useSession } from "next-auth/react";

export interface IComponentsPageProps {}

export default function ComponentsPage(props: IComponentsPageProps) {
  const session: any = useSession();
  const userData = session.data?.user;

  const getUser = async () => {
    // await mockApi.getAlluser();
    try {
      await keyCloakApi.getProfile();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-screen h-screen bg-[#1e293b]">
      <div className="shadow-shadown1 px-10 py-7 flex items-center gap-7 ">
        <button onClick={() => signIn("keycloak")} color="success">
          Login
        </button>
        <button onClick={() => signOut()} color="error">
          Logout
        </button>
        <button onClick={getUser} color="error">
          getUser
        </button>
      </div>

      <div className="p-10">
        {session.status === "authenticated" ? (
          <div className="">
            <p>
              <span className="font-semibold px-1">Email:</span>
              <span className="">{userData?.email ?? ""}</span>
            </p>
            <p>
              <span className="font-semibold px-1">name:</span>
              <span className="">{userData?.name ?? ""}</span>
            </p>

            <p>
              <span className="font-semibold px-1 text-nowrap">
                Access token:
              </span>
              <span className="break-all  text-emerald-300">
                {session.data.accessToken}
              </span>
            </p>

            <p>
              <span className="font-semibold px-1 text-nowrap  ">
                Refresh token:
              </span>
              <span className="break-all text-emerald-300">
                {session.data.refreshToken}
              </span>
            </p>
          </div>
        ) : (
          <span>Please login to view profile.</span>
        )}
      </div>
    </div>
  );
}
