using Fullstack_Minori.Model;


namespace Fullstack_Minori.Services
{
    public interface IMessageService
    {
        Message GetPublicMessage();
        Message GetProtectedMessage();
        Message GetAdminMessage();
    }
}
