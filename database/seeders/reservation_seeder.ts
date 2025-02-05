import Customer from '#models/customer'
import Experience from '#models/experience'
import User from '#models/user'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    await User.createMany([
      {
        email: 'admin@admin.com',
        fullName: 'Admin Admin',
        password: 'Admin2025!',
      },
      {
        email: 'admin2@admin.com',
        fullName: 'Admin2 Admin2',
        password: 'Admin(2)2025!',
      },
    ])

    const experiences = await Experience.createMany([
      {
        name: 'Alice',
        difficulty: 4,
        description:
          "Plongez au cœur d'une expérience captivante avec notre Escape Game VR 'Alice'. Conçu pour les groupes de 1 à 6 joueurs, ce voyage magique d'une durée de 60 minutes vous transporte au Pays des Merveilles. Incarnez Alice, résolvez des énigmes étonnantes et défiez la Reine de cœur pour défaire son sort temporel. Suivez le Lapin blanc, assistez le Chapelier bloqué dans le temps, explorez les labyrinthes du miroir et interagissez avec des personnages emblématiques. Avec des énigmes stimulantes, des décors enchanteurs et une aventure immersive, notre Escape Game Alice vous promet une expérience inoubliable au cœur de ce monde fantastique !",
      },
      {
        name: 'SANCTUM',
        difficulty: 2,
        description:
          "Explorez les mystères de 'Sanctum', notre Escape Game VR conçu pour 2 à 6 joueurs. Vous recevrez une lettre de votre amie détective, Anna, enquêtant sur des disparitions mystérieuses dans une forêt. Plongez dans l'obscurité d'un monastère abandonné, où des secrets anciens et des forces obscures menacent vos vies et vos âmes. Résolvez des énigmes complexes, découvrez des secrets sinistres et affrontez la force antique qui sommeille. Sauvez votre amie et dévoilez les mystères du Sanctum. Préparez-vous à frissonner d'effroi lors de cette aventure captivante.",
      },
      {
        name: 'JUMPERS',
        difficulty: 4,
        description:
          "Plongez dans une aventure palpitante de 50 minutes avec Jumpers, un jeu d'action et de puzzle qui réinvente les règles de l'Escape Game. Affrontez un scénario captivant qui exigera réflexion, agilité, coopération et curiosité pour triompher. Formez une équipe de 2 à 4 joueurs et relevez le défi de résoudre des énigmes, d'éviter des pièges et d'explorer des univers inconnus avant que le temps ne s'épuise. Laissez-vous immerger dans une ambiance unique au style rétro-futuriste steampunk, où des environnements mystérieux et angoissants vous mettront à l'épreuve à chaque tournant. Prêts à vivre cette mission hors du commun ?",
      },
      {
        name: 'CHERNOBYL',
        difficulty: 2,
        description:
          "Vous avez entrepris une visite en bus de la zone d’exclusion autour de Pripyat et de la centrale nucléaire de Tchernobyl. Mais suite à un flash éblouissant inexpliqué, votre bus termine sa course dans un arbre, vous vous en sortirez tout de même indemne ! En sortant, vous découvrez un portail temporel qui vous plongera dans des fragments du passé pour revivre les moments cruciaux de cette tragédie. L'histoire de la ville fantôme de Pripyat se dévoile devant vous, une histoire marquée par la perte de vies humaines. Une catastrophe dont les conséquences perdurent encore de nos jours.",
      },
      {
        name: 'CYBERPUNK',
        difficulty: 3,
        description:
          "Plongez dans le chaos technologique du 22ᵉ siècle avec Cyberpunk. Alors que la société lutte dans un contexte de progrès technologique rapide, votre groupe de cyborgs, chacun doté de compétences spéciales, se lance dans une mission audacieuse. Votre objectif : infiltrer les archives d'une entreprise puissante et dérober des données rares, devenues la denrée la plus précieuse. Entre infiltration discrète, évitement de pièges et téléchargement de mémoire, votre équipe devra naviguer habilement dans ce monde où la technologie et l'intrigue se mêlent.",
      },
      {
        name: 'THE PRISON',
        difficulty: 4,
        description:
          "Évadez-vous de l'injustice dans notre expérience 'Prison'. Accusé à tort, condamné à la chaise électrique, vous devez planifier votre évasion de cette prison de haute sécurité. Evitez les gardiens, lavez votre nom, et échappez-vous avant qu'il ne soit trop tard. Êtes-vous prêt pour cette aventure palpitante ? Que la chance vous guide vers la liberté !",
      },
      {
        name: 'JUNGLE QUEST',
        difficulty: 1,
        description:
          "Explorez une aventure inoubliable avec 'Jungle Quest'. Lors d'une simple promenade au parc, découvrez un portail menant à un sanctuaire mystique peuplé d'animaux et d'îles volantes. Pour rentrer chez vous, plongez-vous dans une série d'énigmes passionnantes et explorez ce monde merveilleux. Laissez-vous emporter par l'intrigue captivante, résolvez les mystères de la Jungle et découvrez le chemin qui vous ramènera chez vous. L'aventure vous attend !",
      },
      {
        name: 'MISSION SIGMA',
        difficulty: 1,
        description:
          "Une course contre la montre commence ! Les services secrets ont mis au jour la cachette d'un terroriste notoire, mais un problème se dresse devant nous : il a armé une ogive nucléaire sur le toit d'une tour piégée. En tant que spécialiste recommandé pour des situations complexes, vous avez été infiltré dans la cour. Maintenant, déjouez les pièges, résolvez les énigmes et évitez la catastrophe nucléaire ! Votre intelligence sera votre meilleur atout dans cette mission cruciale. Êtes-vous prêt à relever le défi ?",
      },
    ])

    const customers = await Customer.createMany([
      {
        address: '1 Impasse Augustin Fresnel',
        city: 'Saint Herblain',
        companyName: 'Lumiplan',
        email: 'nathan.schneider@lumiplan.fr',
        firstname: 'Nathan',
        lastname: 'Schneider',
        addressDetails: "C'est son anniversaire !!!",
        phoneNumber: '0606060601',
        postalCode: '44800',
      },
      {
        address: '24 Mail Pablo Picasso',
        city: 'Nantes',
        companyName: 'The tribe',
        email: 'elouan.dumont@latribu.fr',
        firstname: 'Elouan',
        lastname: 'Dumont',
        phoneNumber: '0606060602',
        postalCode: '44000',
      },
      {
        address: '31 rue fouré',
        city: 'Nantes',
        companyName: 'Next Decision',
        email: 'kevin.guyodo@nextdecision.fr',
        firstname: 'Kévin',
        lastname: 'Guyodo',
        phoneNumber: '0606060606',
        postalCode: '44100',
      },
    ])

    // TODO Uncomment
    // await Booking.createMany([
    //   {
    //     customerId: customers[0].id,
    //     experienceId: experiences[0].id,
    //     playerNumber: 6,
    //     startDateTime: DateTime.fromISO('2025-02-05T12:30:00'),
    //     time: 60,
    //     comment: "Ouai c'était cool",
    //   },
    //   {
    //     customerId: customers[1].id,
    //     experienceId: experiences[1].id,
    //     playerNumber: 8,
    //     startDateTime: DateTime.fromISO('2025-02-06T16:00:00'),
    //     time: 60,
    //     comment: "J'ai bien aimé mais (j'ai pas le suite)",
    //   },
    //   {
    //     customerId: customers[2].id,
    //     experienceId: experiences[2].id,
    //     playerNumber: 4,
    //     startDateTime: DateTime.fromISO('2025-02-07T10:00:00'),
    //     time: 40,
    //     comment: 'Terrible',
    //   },
    // ])
  }
}
