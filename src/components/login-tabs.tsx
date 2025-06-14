import {SignInForm} from "@/components/signin-form";
import {SignUpForm} from "@/components/signup-form";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";

export function LoginTabs() {
    return (
        <Tabs className="w-[400px]" defaultValue="login">
            <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="login">Ingresar</TabsTrigger>
                <TabsTrigger value="signup">Registrarse</TabsTrigger>
            </TabsList>
            <TabsContent value="login">
                <SignInForm />
            </TabsContent>
            <TabsContent value="signup">
                <SignUpForm />
            </TabsContent>
        </Tabs>
    );
}
