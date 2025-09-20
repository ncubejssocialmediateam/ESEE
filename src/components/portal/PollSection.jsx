import { useState, useEffect } from 'react';
import { BarChart3, Users, Clock, CheckCircle, AlertCircle, TrendingUp, MessageSquare } from 'lucide-react';

const PollSection = () => {
  const [activePoll, setActivePoll] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [hasVoted, setHasVoted] = useState(false);
  const [showResults, setShowResults] = useState(false);

  // Poll data will be fetched from API
  const [polls, setPolls] = useState([]);

  const currentPoll = polls[activePoll];

  useEffect(() => {
    // TODO: Fetch polls from API
    // For now, set empty array
    setPolls([]);
  }, []);

  const handleVote = (optionId) => {
    if (hasVoted) return;
    
    setSelectedOption(optionId);
    setHasVoted(true);
    setShowResults(true);
    
    // Simulate vote submission
    setTimeout(() => {
      // In a real app, this would make an API call
      console.log(`Voted for option ${optionId} in poll ${currentPoll.id}`);
    }, 500);
  };

  const resetPoll = () => {
    setSelectedOption(null);
    setHasVoted(false);
    setShowResults(false);
  };

  const nextPoll = () => {
    if (activePoll < polls.length - 1) {
      setActivePoll(activePoll + 1);
      resetPoll();
    }
  };

  const prevPoll = () => {
    if (activePoll > 0) {
      setActivePoll(activePoll - 1);
      resetPoll();
    }
  };

  const getDaysRemaining = (endDate) => {
    const now = new Date();
    const diffTime = endDate - now;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 0;
  };

  const getPollStatus = (endDate) => {
    const daysRemaining = getDaysRemaining(endDate);
    if (daysRemaining === 0) return { status: 'ended', text: 'Ολοκληρώθηκε', color: 'text-gray-500' };
    if (daysRemaining <= 7) return { status: 'ending', text: `${daysRemaining} ημέρες`, color: 'text-orange-500' };
    return { status: 'active', text: `${daysRemaining} ημέρες`, color: 'text-green-500' };
  };

  const pollStatus = getPollStatus(currentPoll.endDate);

  if (polls.length === 0) {
    return (
      <div className="space-y-6">
        <div className="text-center py-8">
          <BarChart3 className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600">Δεν υπάρχουν διαθέσιμες έρευνες γνώμης</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Poll Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-100 rounded-lg">
            <BarChart3 className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Έρευνα Γνώμης</h2>
            <p className="text-sm sm:text-base text-gray-600">Η φωνή των μελών της ΕΣΕΕ</p>
          </div>
        </div>
        
        <div className="flex flex-wrap items-center gap-3 sm:gap-4">
          <div className="flex items-center gap-2 text-sm">
            <Clock className="w-4 h-4" />
            <span className={pollStatus.color}>{pollStatus.text}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Users className="w-4 h-4" />
            <span>{currentPoll.totalVotes} ψήφοι</span>
          </div>
        </div>
      </div>

      {/* Poll Navigation */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600">Έρευνα {activePoll + 1} από {polls.length}</span>
          <div className="flex gap-1">
            {polls.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setActivePoll(index);
                  resetPoll();
                }}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === activePoll ? 'bg-blue-600' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
        </div>
        
        <div className="flex gap-2">
          <button
            onClick={prevPoll}
            disabled={activePoll === 0}
            className="px-3 py-1 text-sm bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Προηγούμενη
          </button>
          <button
            onClick={nextPoll}
            disabled={activePoll === polls.length - 1}
            className="px-3 py-1 text-sm bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Επόμενη
          </button>
        </div>
      </div>

      {/* Current Poll */}
      <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-2">
            <span className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full">
              {currentPoll.category}
            </span>
            <div className="flex items-center gap-1 text-sm text-gray-500">
              <TrendingUp className="w-4 h-4" />
              <span>Ενεργή έρευνα</span>
            </div>
          </div>
          
          <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">
            {currentPoll.title}
          </h3>
          <p className="text-sm sm:text-base text-gray-600">
            {currentPoll.description}
          </p>
        </div>

        {/* Poll Options */}
        <div className="space-y-3">
          {currentPoll.options.map((option) => (
            <div key={option.id} className="relative">
              <button
                onClick={() => handleVote(option.id)}
                disabled={hasVoted || pollStatus.status === 'ended'}
                className={`w-full p-3 sm:p-4 text-left rounded-lg border-2 transition-all duration-200 ${
                  hasVoted && selectedOption === option.id
                    ? 'border-blue-500 bg-blue-50'
                    : hasVoted
                    ? 'border-gray-200 bg-gray-50'
                    : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50'
                } ${pollStatus.status === 'ended' ? 'cursor-not-allowed opacity-75' : 'cursor-pointer'}`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {hasVoted && selectedOption === option.id && (
                      <CheckCircle className="w-5 h-5 text-blue-600" />
                    )}
                    <span className="font-medium text-gray-900 text-sm sm:text-base">
                      {option.text}
                    </span>
                  </div>
                  
                  {showResults && (
                    <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3">
                      <span className="text-xs sm:text-sm text-gray-600">
                        {option.votes} ψήφοι
                      </span>
                      <span className="text-xs sm:text-sm font-semibold text-blue-600">
                        {option.percentage}%
                      </span>
                    </div>
                  )}
                </div>
                
                {showResults && (
                  <div className="mt-3">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${option.percentage}%` }}
                      />
                    </div>
                  </div>
                )}
              </button>
            </div>
          ))}
        </div>

        {/* Poll Actions */}
        <div className="mt-6 pt-6 border-t border-gray-200">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-sm text-gray-600">
              <div className="flex items-center gap-1">
                <Users className="w-4 h-4" />
                <span>{currentPoll.totalVotes} συμμετέχοντες</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                <span>Λήγει στις {currentPoll.endDate.toLocaleDateString('el-GR')}</span>
              </div>
            </div>
            
            {hasVoted && (
              <div className="flex items-center gap-2 text-green-600">
                <CheckCircle className="w-4 h-4" />
                <span className="text-sm font-medium">Η ψήφος σας καταχωρήθηκε!</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Poll Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-lg shadow-md p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-100 rounded-lg">
              <Users className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Συνολικές ψήφοι</p>
              <p className="text-xl font-bold text-gray-900">
                {polls.reduce((sum, poll) => sum + poll.totalVotes, 0)}
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <BarChart3 className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Ενεργές έρευνες</p>
              <p className="text-xl font-bold text-gray-900">
                {polls.filter(poll => getDaysRemaining(poll.endDate) > 0).length}
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-100 rounded-lg">
              <MessageSquare className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Ολοκληρωμένες</p>
              <p className="text-xl font-bold text-gray-900">
                {polls.filter(poll => getDaysRemaining(poll.endDate) === 0).length}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PollSection;
