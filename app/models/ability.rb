class Ability
  include CanCan::Ability

  def initialize(user)

      user ||= User.new # guest user (not logged in)


      #自定义Method
      alias_action :new, :index, :create, :worker_edit, :worker_transfer, :show, :to => :woker
      alias_action :new, :index, :create, :user_edit,  :to => :subscriber
      alias_action :new, :index, :create, :manager_edit, :worker_edit, :worker_transfer, :show, :to => :director

      ## 指定超级用户
      if user.number == 1
        can :manager, :all
      else
        user.permissions.each do |p|
          begin
            action = p.action.to_sym
            subject = begin
                        # RESTful Controllers
              p.subject.camelize.constantize
            rescue
              # Non RESTful Controllers
              p.subject.underscore.to_sym
            end
            can action, subject
          rescue => e
            Rails.logger.info "#{e}"
            Rails.logger.info "#{subject}"
          end
        end
      end
    # Define abilities for the passed in user here. For example:
    #
    #   user ||= User.new # guest user (not logged in)
    #   if user.admin?
    #     can :manage, :all
    #   else
    #     can :read, :all
    #   end
    #
    # The first argument to `can` is the action you are giving the user 
    # permission to do.
    # If you pass :manage it will apply to every action. Other common actions
    # here are :read, :create, :update and :destroy.
    #
    # The second argument is the resource the user can perform the action on. 
    # If you pass :all it will apply to every resource. Otherwise pass a Ruby
    # class of the resource.
    #
    # The third argument is an optional hash of conditions to further filter the
    # objects.
    # For example, here the user can only update published articles.
    #
    #   can :update, Article, :published => true
    #
    # See the wiki for details:
    # https://github.com/ryanb/cancan/wiki/Defining-Abilities
  end
end
