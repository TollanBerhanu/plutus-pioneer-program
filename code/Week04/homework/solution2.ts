import {
    Data,
    Lucid,
    Blockfrost,
    getAddressDetails,
    SpendingValidator,
    TxHash,
    Datum,
    UTxO,
    Address,
    AddressDetails,
} from "https://deno.land/x/lucid@0.9.1/mod.ts"
// create a seed.ts file with your seed
import { secretSeed } from "../lecture/seed.ts"

// set blockfrost endpoint
const lucid = await Lucid.new(
  new Blockfrost(
    "https://cardano-preview.blockfrost.io/api/v0",
    "previewTboSqp1nB894P6wgrGA1PBv8rgUvIS5v"
  ),
  "Preview"
);

// load local stored seed as a wallet into lucid
lucid.selectWalletFromSeed(secretSeed, {accountIndex: 1});
const addr2: Address = await lucid.wallet.address();
lucid.selectWalletFromSeed(secretSeed, {accountIndex: 0});
const addr1: Address = await lucid.wallet.address();


console.log(addr1 + "  ... Beneficiary");
console.log(addr2 + "  ... Sender");

// Define the mistery plutus script
const misteryScript: SpendingValidator = {
    type: "PlutusV2",
    script: "590b10590b0d010000332323233223232332232323232323232332232332232323232323232323332223232323222223232533532323232533553353235001222222222222533533355301812001321233001225335002210031001002502a25335333573466e3c0600040e40e04d40b0004540ac010840e440dd400440ac4cd5ce249196e6f74207369676e65642062792062656e65666963696172790002a15335323232350022235002223500522350022253335333501800b00600215335001153350051333501700b00300710351333501700b00300710351333501700b0030073550032222222222220053350133350153502800502c335014502702c123333333300122333573466e1c0080040b80b4894cd4ccd5cd19b8700200102e02d101415335333573466e240080040b80b44048404c88ccd5cd19b8800200102e02d22333573466e240080040b80b488ccd5cd19b8900200102d02e22333573466e200080040b40b8894cd4ccd5cd19b8900200102e02d10011002225335333573466e240080040b80b44008400440ac4cd5ce2491b646561646c696e6520686173206e6f7420706173736564207965740002a102a135001220023333573466e1cd55cea80224000466442466002006004646464646464646464646464646666ae68cdc39aab9d500c480008cccccccccccc88888888888848cccccccccccc00403403002c02802402001c01801401000c008cd408808cd5d0a80619a8110119aba1500b33502202435742a014666aa04ceb94094d5d0a804999aa8133ae502535742a01066a04405e6ae85401cccd540980c1d69aba150063232323333573466e1cd55cea80124000466a0466464646666ae68cdc39aab9d5002480008cd40a4cd40e9d69aba15002303d357426ae8940088c98c80fccd5ce02102081e89aab9e5001137540026ae854008c8c8c8cccd5cd19b8735573aa0049000119a81419a81d3ad35742a004607a6ae84d5d1280111931901f99ab9c04204103d135573ca00226ea8004d5d09aba2500223263203b33573807c07a07226aae7940044dd50009aba1500533502275c6ae854010ccd540980b08004d5d0a801999aa8133ae200135742a004605c6ae84d5d1280111931901b99ab9c03a039035135744a00226ae8940044d5d1280089aba25001135744a00226ae8940044d5d1280089aba25001135744a00226ae8940044d55cf280089baa00135742a008603c6ae84d5d1280211931901499ab9c02c02b0273333573466e1cd55ce9baa0054800080a88c98c80a0cd5ce0158150131bad005102813263202633573892010350543500028135573ca00226ea8004c8004d5408c88448894cd40044d400c88004884ccd401488008c010008ccd54c01c480040140100044888d400888d400c894ccd4ccd402001c01000854cd400c40044098409440984888c8c8c8c94ccd4018854ccd4018854ccd402084c011261300349854ccd401c84c01126130034984034402c54ccd401c84c011261300349854ccd401884c0112613003498403054ccd401484028402c402454ccd4014854ccd401c84c015261300449854ccd401884c01526130044984030402854ccd401884c015261300449854ccd401484c0152613004498402c94ccd4014854ccd401c854ccd401c84ccd402c028008004585858402c54ccd4018854ccd401884ccd40280240080045858584028402494ccd4010854ccd4018854ccd401884ccd4028024008004585858402854ccd4014854ccd401484ccd40240200080045858584024402094ccd400c854ccd4014854ccd401484ccd4024020008004585858402454ccd4010854ccd401084ccd402001c0080045858584020401c94ccd4008854ccd4010854ccd401084ccd402001c008004585858402054ccd400c854ccd400c84ccd401c018008004585858401c401848d40048888888801c488800c4888008488800448848cc00400c00848848cc00400c00848848cc00400c00848c88c008dd6000990009aa80d111999aab9f0012500a233500930043574200460066ae880080688c8c8cccd5cd19b8735573aa004900011991091980080180118071aba150023005357426ae8940088c98c8060cd5ce00d80d00b09aab9e5001137540024646464646666ae68cdc39aab9d5004480008cccc888848cccc00401401000c008c8c8c8cccd5cd19b8735573aa0049000119910919800801801180b9aba1500233500f016357426ae8940088c98c8074cd5ce01000f80d89aab9e5001137540026ae854010ccd54021d728039aba150033232323333573466e1d4005200423212223002004357426aae79400c8cccd5cd19b875002480088c84888c004010dd71aba135573ca00846666ae68cdc3a801a400042444006464c6403e66ae7008808407407006c4d55cea80089baa00135742a00466a016eb8d5d09aba2500223263201933573803803602e26ae8940044d5d1280089aab9e500113754002266aa002eb9d6889119118011bab00132001355017223233335573e0044a010466a00e66442466002006004600c6aae754008c014d55cf280118021aba200301813574200222440042442446600200800624464646666ae68cdc3a800a400046a00e600a6ae84d55cf280191999ab9a3370ea00490011280391931900a19ab9c017016012011135573aa00226ea800448488c00800c44880048c8c8cccd5cd19b875001480188c848888c010014c01cd5d09aab9e500323333573466e1d400920042321222230020053009357426aae7940108cccd5cd19b875003480088c848888c004014c01cd5d09aab9e500523333573466e1d40112000232122223003005375c6ae84d55cf280311931900919ab9c01501401000f00e00d135573aa00226ea80048c8c8cccd5cd19b8735573aa004900011991091980080180118029aba15002375a6ae84d5d1280111931900719ab9c01101000c135573ca00226ea80048c8cccd5cd19b8735573aa002900011bae357426aae7940088c98c8030cd5ce00780700509baa001232323232323333573466e1d4005200c21222222200323333573466e1d4009200a21222222200423333573466e1d400d2008233221222222233001009008375c6ae854014dd69aba135744a00a46666ae68cdc3a8022400c4664424444444660040120106eb8d5d0a8039bae357426ae89401c8cccd5cd19b875005480108cc8848888888cc018024020c030d5d0a8049bae357426ae8940248cccd5cd19b875006480088c848888888c01c020c034d5d09aab9e500b23333573466e1d401d2000232122222223005008300e357426aae7940308c98c8054cd5ce00c00b80980900880800780700689aab9d5004135573ca00626aae7940084d55cf280089baa0012323232323333573466e1d400520022333222122333001005004003375a6ae854010dd69aba15003375a6ae84d5d1280191999ab9a3370ea0049000119091180100198041aba135573ca00c464c6401c66ae7004404003002c4d55cea80189aba25001135573ca00226ea80048c8c8cccd5cd19b875001480088c8488c00400cdd71aba135573ca00646666ae68cdc3a8012400046424460040066eb8d5d09aab9e500423263200b33573801c01a01201026aae7540044dd500089119191999ab9a3370ea00290021280311999ab9a3370ea004900111a80418031aba135573ca00846666ae68cdc3a801a400042444004464c6401866ae7003c0380280240204d55cea80089baa0011212223003004112220012323333573466e1d40052002200623333573466e1d40092000200623263200633573801201000800626aae74dd5000a4c244004244002240029210350543100112323001001223300330020020014891c6cec697e064de530cef331f0a17358c0e7a47f96343ec4f8b015b38a0001",
};
const misteryAddress: Address = lucid.utils.validatorToAddress(misteryScript);

// Create the mistery datum type
const MisteryDeadlineDatum = Data.BigInt;
type MisteryDeadlineDatum = Data.Static<typeof MisteryDeadlineDatum>;

// Set the mistery sender to addr1.
// const senderPKH: string = getAddressDetails(addr1).paymentCredential.hash
const details1: AddressDetails = getAddressDetails(addr1); // get address details from the address we got from our wallet
const beneficiaryPKH: string = details1.paymentCredential.hash // get our hashed payment address, which is our pubKeyHash

// Set the mistery beneficiary to addr2.
// const beneficiaryPKH: string = getAddressDetails(addr2).paymentCredential.hash
const details2: AddressDetails = getAddressDetails(addr2); // get address details from the address we got from our wallet
const senderPKH: string = details2.paymentCredential.hash // get our hashed payment address, which is our pubKeyHash

console.log(beneficiaryPKH + "  ... Beneficiary");
console.log(senderPKH + "  ... Sender");

// Set the mistery deadline
// const deadlineDate: Date = new Date("2023-04-19T14:07:00Z")
const deadlineDate: Date = new Date("2023-04-20T07:10:00Z")
const datum: MisteryDeadlineDatum  = BigInt(deadlineDate.getTime());

// An asynchronous function that sends an amount of Lovelace to the script with the above datum.
async function vestFunds(amount: bigint): Promise<TxHash> {
    lucid.selectWalletFromSeed(secretSeed, {accountIndex: 1});
    const dtm: Datum = Data.to<MisteryDeadlineDatum>(datum,MisteryDeadlineDatum);
    const tx = await lucid
      .newTx()
      .payToContract(misteryAddress, { inline: dtm }, { lovelace: amount })
      .complete();
    const signedTx = await tx.sign().complete();
    const txHash = await signedTx.submit();
    return txHash
}

async function claimVestedFunds(): Promise<TxHash> {
    lucid.selectWalletFromSeed(secretSeed, {accountIndex: 0});

    const utxoAtScript: UTxO[] = await lucid.utxosAt(misteryAddress);
    console.log(utxoAtScript)
    if (utxoAtScript && utxoAtScript.length > 0) {
        const tx = await lucid
            .newTx()
            .collectFrom(utxoAtScript, Data.void())
            .addSignerKey(beneficiaryPKH)
            .attachSpendingValidator(misteryScript)
            .validFrom(Date.now()-100000)
            .validTo(Date.now()+100000)
            .complete();

        const signedTx = await tx.sign().complete();
        const txHash = await signedTx.submit();
        return txHash
    }
    else return "No UTxO's found that can be claimed"
}

// console.log(await vestFunds(5000000n));
console.log(await claimVestedFunds());