import application from "./application.mjs";

async function main()
{
    try {
        await application.run()
    } catch (e) {
        console.log(e.toString());
    }
}

main()