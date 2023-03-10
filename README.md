# Voting Dapp project #3 Alyra training

This project demonstrates a basic Dapp use case deployed on __Goerli__. It comes with a __Hardhat__ backend with a simple contract simulating a Voting game, and a __Next/React__ frontend. 

-----------------

## Presentation of the game

👉 __Le processus de vote__ : 

Voici le déroulement de l'ensemble du processus de vote :
* L'administrateur du vote enregistre une liste blanche d'électeurs identifiés par leur adresse Ethereum.
* L'administrateur du vote commence la session d'enregistrement de la proposition.
* Les électeurs inscrits sont autorisés à enregistrer leurs propositions pendant que la session d'enregistrement est active.
* L'administrateur de vote met fin à la session d'enregistrement des propositions.
* L'administrateur du vote commence la session de vote.
* Les électeurs inscrits votent pour leur proposition préférée.
* L'administrateur du vote met fin à la session de vote.
* L'administrateur du vote comptabilise les votes.
* Tout le monde peut vérifier les derniers détails de la proposition gagnante.

-----------------

## Visuels
![alt text](https://github.com/vigimani/fullstack-voting-project/blob/main/1.png)
![alt text](https://github.com/vigimani/fullstack-voting-project/blob/main/2.png)

## Useful links
* [Loom video presentation](https://www.loom.com/share/151f5dedfb3a4c0694fc5b497445b12b)
* [Deployment link Vercel](https://fullstack-voting-project-ds78s7hz4-vigimani.vercel.app/)
* [Addresse etherscan du contract on Goerli](https://goerli.etherscan.io/address/0xbE7EEd06699192506a604ca071469D51B6EDE14a)

## Test coverage for Voting contract - projet 2 Alyra

File         |  % Stmts | % Branch |  % Funcs |  % Lines |Uncovered Lines |
-------------|----------|----------|----------|----------|----------------|
  Voting.sol |      100 |    95.83 |      100 |      100 |                |
