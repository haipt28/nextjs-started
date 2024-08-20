import { authApi } from "@/api-client";
import { signIn, signOut, useSession } from "next-auth/react";

export interface IComponentsPageProps {}

export default function ComponentsPage(props: IComponentsPageProps) {
  const session: any = useSession();
  const userData = session.data?.user;

  return (
    <div className="w-screen h-screen bg-[#1e293b]">
      <div className="shadow-shadown1 px-10 py-7 flex items-center gap-7 ">
        <button onClick={() => signIn("keycloak")} color="success">
          Login
        </button>
        <button onClick={() => signOut()} color="error">
          Logout
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
              <span className="font-semibold px-1">Username:</span>
              <span className="">{userData?.preferred_username ?? ""}</span>
            </p>
            <p>
              <span className="font-semibold px-1">First Name:</span>
              <span className="">{userData?.given_name ?? ""}</span>
            </p>
            <p>
              <span className="font-semibold px-1">Last Name:</span>
              <span className="">{userData?.family_name ?? ""}</span>
            </p>
            <p>
              <span className="font-semibold px-1 text-nowrap">
                Access token:
              </span>
              <span className="break-all">{session.data.accessToken}</span>
            </p>

            <p>
              <span className="font-semibold px-1 text-nowrap">
                Refresh token:
              </span>
              <span className="break-all">{session.data.refreshToken}</span>
            </p>
          </div>
        ) : (
          <span>Please login to view profile.</span>
        )}
      </div>
    </div>
  );
}
