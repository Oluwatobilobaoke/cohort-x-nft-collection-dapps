import { Box, Button, Container, Flex, Link, Text } from "@radix-ui/themes";
import { useWeb3ModalAccount } from "@web3modal/ethers/react";
import { configureWeb3Modal } from "./connection";
import "@radix-ui/themes/styles.css";
import Header from "./component/Header";
import AppTabs from "./component/AppTabs";
import TransferModal from "./component/TansferModal";
import useCollections from "./hooks/useCollections";
import useMyNfts from "./hooks/useMyNfts";
import useMintNft from "./hooks/useMintNft";

configureWeb3Modal();

function App() {
  const { isConnected } = useWeb3ModalAccount();
  const tokensData = useCollections();
  const { data: myTokenIds, idToAddress } = useMyNfts();
  const mintNft = useMintNft();

  const myTokensData = tokensData.filter((x, index) =>
    myTokenIds.includes(index)
  );
  return (
    <Container>
      <Header />
      <main className="mt-6">
        <AppTabs
          MyNfts={
            <Flex align="center" gap="8" wrap={"wrap"}>
              {myTokensData.length === 0 ? (
                <Text>No NFT owned yet</Text>
              ) : (
                myTokensData.map((x) => (
                  <Box key={x.dna} className="w-[20rem]">
                    <img
                      src={x.image}
                      className="w-full object-contain"
                      alt={x.name}
                    />
                    <Text className="block text-2xl">Name: {x.name}</Text>
                    <Text className="block">Description: {x.description}</Text>
                    <Link
                      target="_blank"
                      className="px-8 py-2 text-xl m-2"
                      href={import.meta.env.VITE_opensea_url + x.edition}
                    >
                      Show on Opensea
                    </Link>
                    <TransferModal id={x.edition} />
                  </Box>
                ))
              )}
            </Flex>
          }
          AllCollections={
            <Flex align="center" gap="8" wrap={"wrap"}>
              {tokensData.length === 0 ? (
                <Text>Loading...</Text>
              ) : (
                tokensData.map((x, index) => (
                  <Box key={x.dna} className="w-[20rem]">
                    <img
                      src={x.image}
                      className="w-full object-contain"
                      alt={x.name}
                    />
                    <Text className="block text-2xl">Name: {x.name}</Text>
                    <Text className="block">Description: {x.description}</Text>
                    {isConnected && idToAddress[index] === undefined ? (
                      <Flex justify={"center"} gap={"2"}>
                        <Text>{idToAddress[index].slice(0, 8)}...</Text>
                        <Link
                          target="_blank"
                          href={import.meta.env.VITE_opensea_url + index}
                        >
                          Show on OpenSea
                        </Link>
                      </Flex>
                    ) : (
                      <Button
                        onClick={async () => {
                          mintNft(x.edition);
                        }}
                        className="px-8 py-2 text-xl mt-2"
                      >
                        Mint
                      </Button>
                    )}
                  </Box>
                ))
              )}
            </Flex>
          }
        />
      </main>
    </Container>
  );
}

export default App;
