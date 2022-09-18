- telecharger le repo
- ouvrir un terminal dans le repo

#lancer l'app :
- cd my-app
- npm run dev

#deployer les contracts
- cd hardhat
- npx hardhat clean
- npx hardhat compile (pour compiler)
- npx hardhat run scripts/deploy.js --network matic (compile et déploie sur mumbai)

#addresse des contracts déployés à 3h du mat :
- KofiCoin :  0x51940154B1641e81584ed1cf6C123A5889E22842
- Ballot :  0x7eB382F37bAC3F3Cc0C909191090628d545c6447
- KofiNFT1155 :  0x592977B96aA4FC9A83b4f31d1F33eBc0A7654aF0