// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;

import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/access/Ownable.sol";

contract Vote is Ownable {
    // This declares a single voter.
    struct Voter {
        uint weight; // weight is accumulated by rank on LW3.
        uint nVote; // number of time this user voted on proposals.
    }
    
    // This is a type for a single proposal.
    struct Proposal {
        address contractAddress; // address of the contract.
        string url; // url of the project associated with the contract.
        uint totalVoters; // number of accumulated votes.
        uint totalApproveWeight; // flat number of approval rate ( (totalVoters / totalApproveWeight) to get the approval ratio).
        mapping(address => bool) hasVoted; // mapping to check who already voted.
    }

    uint public proposalCount; // number of proposal.


    // `Voter` mapping struct for each possible address.
    mapping(address => Voter) public voters;

    // `Proposal` mapping uint representing the index for each proposal.
    mapping(uint => Proposal) public proposals;


    constructor() {
        // setting the owner and proposalCount;
        address owner = msg.sender;
        voters[owner].weight = 1;
        proposalCount = 0;
        }

    function addProposal(address contractAddress, string memory url ) public {
      //  require(proposals[contractAddress].address == null , "Contract has already been proposed");
        require(bytes(url).length > 0, "Dont leave the url empty!");
        // Setting the proposal to an index in the mapping, to access them easily;
        Proposal storage r = proposals[proposalCount++];
        // Setting the proposal values;
        r.url = url;
        r.totalVoters = 0;
        r.totalApproveWeight = 0;
        r.contractAddress = contractAddress;
    }

    function getVotingWeight(address _sender) public {
    //   require(voters[voter].weight == 0);
    //   require(,"The voter already voted.");
    //   voters[voter].weight = A DEFINIR (en fonction de l'avancement LW3);
    }

    function vote(uint contractIndex, bool approve) external {

        require(proposals[contractIndex].hasVoted[msg.sender] == false, "Already voted !");
        require(voters[msg.sender].weight != 0, "Has no right to vote");

        // Set hasVoted to true to avoid the user the possibility of voting multiple time
        proposals[contractIndex].hasVoted[msg.sender] = true;
        // Track the number of time a user has voted for proposals
        voters[msg.sender].nVote++;

        // If user approve, add his weight to totalApproveWeight
        if (approve == true){
            proposals[contractIndex].totalApproveWeight += voters[msg.sender].weight;
        }
        // Add 
        proposals[contractIndex].totalVoters += voters[msg.sender].weight;
    }

    /// @dev Computes the winning proposal taking all
    /// previous votes into account.
    // function proposalResult() public view returns (uint winningProposal_) {
    //     uint winningVoteCount = 0;
    //     for (uint p = 0; p < proposals.length; p++) {
    //         if (proposals[p].voteCount > winningVoteCount) {
    //             winningVoteCount = proposals[p].voteCount;
    //             winningProposal_ = p;
    //         }
    //     }
    // }

    // function getProposalData(address Struct) public view returns (struct) {
     //   return Proposal[Struct];
    // }
}
