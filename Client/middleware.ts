import authConfig from "./auth.config" 
import NextAuth from "next-auth"
import { apiAuthPrefix , publicRoutes , authRoutes , defaultRedirect } from "./routes";
const {auth} = NextAuth(authConfig);

export default auth((req) => {
  const {nextUrl} = req ;
  const isLoggedIn = !!req.auth;
  
console.log(isLoggedIn)
  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
  const isAuthRoute  = authRoutes.includes(nextUrl.pathname);
  
  if(isApiAuthRoute){
    return  ;
  }
  if(isAuthRoute){
    if(isLoggedIn){
      return  Response.redirect(new URL(defaultRedirect , nextUrl));
    }
    return 
  }


  if(!isLoggedIn && !isPublicRoute){
    return  Response.redirect(new URL('/auth/login' , nextUrl));
  }
return 
})
 
export const config = {
    matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],

}