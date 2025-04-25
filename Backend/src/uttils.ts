export function random(len: number) {
    const options: string = "jbsfjdbvbkbbkefbksvbkjbsfdjkvb1212324783546653475734567204907";
    let ans: string = "";

    for (let i = 0; i < len; i++) {
        ans = ans + options[Math.floor(Math.random() * options.length)]
    }

    return ans;
}