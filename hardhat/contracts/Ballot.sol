// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;

contract Ballot {
    // This declares a single voter.
    struct Voter {
        uint weight; // weight is accumulated by rank on LW3
        uint nVote; // number of time this user voted on proposals
    }

    // This is a type for a single proposal.
    struct Proposal {
        // address contractAddress;
        string url;
        uint totalVoters; // number of accumulated votes
        uint totalApproveWeight;
        mapping(address => bool) hasVoted;
    }

    address public Owner;

    // This declares a state variable that
    // stores a `Voter` struct for each possible address.
    mapping(address => Voter) public voters;

    // A dynamically-sized array of `Proposal` structs.
    mapping(address => Proposal) public proposals;

    /// Create a new ballot to choose one of `proposalNames`.
    constructor() {
        address owner = msg.sender;
        voters[owner].weight = 1;
    }

    function addProposal(address contractAddress, string memory url) public {
        proposals[contractAddress].url = url;
        proposals[contractAddress].totalVoters = 0;
        proposals[contractAddress].totalApproveWeight = 0;
    }

    function getVotingWeight(address _sender) public {
        //   require(voters[voter].weight == 0);
        //   require(,"The voter already voted.");
        //   voters[voter].weight = A DEFINIR (en fonction de l'avancement LW3);
    }

    function vote(address contractAddress, bool approve) external {
        require(
            proposals[contractAddress].hasVoted[msg.sender] == false,
            "Already voted !"
        );
        require(voters[msg.sender].weight != 0, "Has no right to vote");
        proposals[contractAddress].hasVoted[msg.sender] = true;
        voters[msg.sender].nVote++;
        if (approve == true) {
            proposals[contractAddress].totalApproveWeight += voters[msg.sender]
                .weight;
        }
        proposals[contractAddress].totalVoters += voters[msg.sender].weight;
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

    // function getProposalData() public view returns (uint) {
    //     return ;
    // }
}
